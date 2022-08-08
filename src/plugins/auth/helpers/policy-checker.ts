import { Roles } from '@models';
import { retrievePolicies as getPolicyDocuments } from './policy-retriever';
import {
  heirarchyChecker,
  getHighestHeirarchy as getHighestHeir,
} from './heirarchy';

import type {
  IScopeDoc,
  IPolicy,
  IPolicyDoc,
  IPolicyLeanDoc,
  IRoleDoc,
  IRoleLeanDoc,
  IPendingUserDoc,
  IUserDoc,
} from '@models/types';
import type { ID } from '@typs/model.objectid';

interface IPolicyChecker {
  policy: string;
  value: boolean;
}

const convertObjectID = (idArray: ID<IPolicyDoc>[]): string[] => {
  const convertedArr = idArray.map((ids) => String(ids));
  return convertedArr;
};

const checkGlobalFlags = (policyDocs: IPolicyLeanDoc[]): boolean => {
  const flags: boolean[] = [];
  policyDocs.forEach((policy) => flags.push(policy.global_flag));
  if (flags.includes(false)) {
    throw new Error(
      'Global Flag is Turned Off, Please Turn on to Enable this Function',
    );
  } else {
    return true;
  }
};

const checkPolicyArray = (
  policyDocs: IPolicyLeanDoc[],
  userPolicies: string[],
): IPolicyChecker[] => {
  const enabled = checkGlobalFlags(policyDocs);
  if (enabled) {
    const policyChecker: IPolicyChecker[] = [];
    for (const policy of policyDocs) {
      const policyId = policy._id;
      const policyBool = userPolicies.includes(String(policyId));
      policyChecker.push({
        policy: String(policyId),
        value: policyBool,
      });
    }
    return policyChecker;
  } else {
    throw new Error(
      'Global Flag is Turned off, Turn on to perform this Action',
    );
  }
};

interface IDeeperRoles {
  roleDoc: IRoleLeanDoc;
  allowedPolicies: ID<IPolicyDoc>[];
}

interface asyncWhileLoopResult<T> {
  nextStartValue: string;
  finalResult: T;
}

const runAsyncWhileLoop = async <T, U>(
  start: string,
  stop: string,
  otherHelpers: U,
  func: (start: string, helpers: U) => Promise<asyncWhileLoopResult<T>>,
): Promise<T> => {
  let startValue = start;
  let result: T | undefined = undefined;
  while (startValue !== stop) {
    const { nextStartValue, finalResult } = await func(
      startValue,
      otherHelpers,
    );
    startValue = nextStartValue;
    result = finalResult;
    if (startValue === stop) {
      return result;
    }
  }
  if (result !== undefined) {
    return result;
  } else {
    throw new Error('Nice');
  }
};

interface IGetDeeperRoleHelpers {
  roleId: string;
  userPolicies: ID<IPolicyDoc>[];
}

export const getDeeperRoles = async (
  adminRole: string,
  otherPolicies?: ID<IPolicyDoc>[],
): Promise<IDeeperRoles> => {
  let userType = '';
  const roleId = adminRole;
  const userPolicies: ID<IPolicyDoc>[] = otherPolicies ? otherPolicies : [];
  const deeperRoles = await runAsyncWhileLoop<
    IDeeperRoles,
    IGetDeeperRoleHelpers
  >(
    '',
    'main',
    {
      roleId,
      userPolicies,
    },
    async (start, helpers) => {
      const roleDoc = await Roles.findById(helpers.roleId).lean().exec();
      if (roleDoc) {
        userType = roleDoc.type;
        helpers.userPolicies = [
          ...roleDoc.allowed_policies,
          ...helpers.userPolicies,
        ];
        if (roleDoc.delgates_from) {
          helpers.roleId = String(roleDoc.delgates_from);
        }
        const whileresult: asyncWhileLoopResult<IDeeperRoles> = {
          nextStartValue: userType,
          finalResult: {
            roleDoc,
            allowedPolicies: helpers.userPolicies,
          },
        };
        return whileresult;
      } else {
        userType = 'main';
        throw new Error("Cannot Find User's Role Details");
      }
    },
  );
  return deeperRoles;
};

interface IUserRole {
  scope: ID<IScopeDoc>;
  role: ID<IRoleDoc>;
}

const getHighestHeirarchy = async (
  roles: IUserRole[],
  otherPolicies?: ID<IPolicyDoc>[],
): Promise<IDeeperRoles> => {
  const heirarchies: { role: string; deepRoles: IDeeperRoles }[] = [];
  const promises = roles.map(
    (role) =>
      new Promise<void>((resolve, reject) => {
        getDeeperRoles(String(role.role), otherPolicies)
          .then((deepRoles) => {
            heirarchies.push({
              role: deepRoles.roleDoc.name,
              deepRoles,
            });
            resolve();
          })
          .catch((e) => {
            reject(new Error(e));
          });
      }),
  );
  await Promise.all(promises);
  const roleDocs = heirarchies.map((heirarchy) => heirarchy.deepRoles.roleDoc);
  const highestRole = await getHighestHeir(roleDocs);
  const [highestDeepestRole] = heirarchies.filter(
    (heirarchy) => heirarchy.role === highestRole.name,
  );
  return highestDeepestRole.deepRoles;
};

interface IGetUserPoliciesResult {
  allowedPolicies: string[];
  adminRole: IRoleLeanDoc;
  userRole?: IRoleLeanDoc;
}

const getUserPolicies = async (
  admin: IUserDoc,
  otherPolicies?: ID<IPolicyDoc>[],
  scope?: IScopeDoc['_id'],
  user?: IUserDoc | IPendingUserDoc,
): Promise<IGetUserPoliciesResult> => {
  if (user && scope) {
    const [userRole] = user.roles.filter((role) => role.scope === scope);
    const [adminRole] = user.roles.filter((role) => role.scope === scope);
    const [userDeepRole, deepRoles] = await Promise.all([
      getDeeperRoles(String(userRole.role)),
      getDeeperRoles(String(adminRole), otherPolicies),
    ]);
    const { roleDoc } = userDeepRole;
    const { roleDoc: adminRoleDoc, allowedPolicies } = deepRoles;
    if (heirarchyChecker(adminRoleDoc, roleDoc)) {
      return {
        allowedPolicies: convertObjectID(allowedPolicies),
        adminRole: adminRoleDoc,
        userRole: roleDoc,
      };
    } else {
      throw new Error(
        'This Admin Cannot Perform this action against this User',
      );
    }
  } else if (user && !scope) {
    const [userDeepRole, deepRoles] = await Promise.all([
      getHighestHeirarchy(user.roles),
      getHighestHeirarchy(admin.roles, otherPolicies),
    ]);
    const { roleDoc } = userDeepRole;
    const { roleDoc: adminRoleDoc, allowedPolicies } = deepRoles;
    if (heirarchyChecker(adminRoleDoc, roleDoc)) {
      return {
        allowedPolicies: convertObjectID(allowedPolicies),
        adminRole: adminRoleDoc,
        userRole: roleDoc,
      };
    } else {
      throw new Error(
        'This Admin Cannot Perform this action against this User',
      );
    }
  } else {
    const deepRoles = await getHighestHeirarchy(admin.roles, otherPolicies);
    const { allowedPolicies } = deepRoles;
    return {
      allowedPolicies: convertObjectID(allowedPolicies),
      adminRole: deepRoles.roleDoc,
    };
  }
};

interface ICheckPolicyResultAdmin {
  check: boolean;
  adminRole: IRoleLeanDoc;
}

interface ICheckPolicyResultUser {
  check: boolean;
  adminRole: IRoleLeanDoc;
  userRole: IRoleLeanDoc;
}

export async function checkPolicy(
  policies: IPolicy[],
  admin: IUserDoc,
  returnRoleDocs: true,
  scope: IScopeDoc['_id'],
  user: IUserDoc | IPendingUserDoc,
): Promise<ICheckPolicyResultUser>;
export async function checkPolicy(
  policies: IPolicy[],
  admin: IUserDoc,
  returnRoleDocs: true,
  scope?: IScopeDoc['_id'],
  user?: IUserDoc | IPendingUserDoc,
): Promise<ICheckPolicyResultAdmin>;
export async function checkPolicy(
  policies: IPolicy[],
  admin: IUserDoc,
  returnRoleDocs?: false,
  scope?: IScopeDoc['_id'],
  user?: IUserDoc | IPendingUserDoc,
): Promise<true>;
/**
 * Checks the Given Policies to the Given User for the Particular Scope
 *
 * @async
 * @param {IPolicy[]} policies - Array of Policies to Check
 * @param {IUserDoc} admin - User to which Policy is to be Checked
 * @param {boolean} returnRoleDocs - Returns the Role Documents of admin and user if there
 * @param {string} scope - Scope ID for which Policies to be checked
 * @param {IUserDoc} user - User to whom Action is applied
 * @returns {Promise<ICheckPolicyResultUser | ICheckPolicyResultAdmin | true>} - always resolves to true or throws error
 */
export async function checkPolicy(
  policies: IPolicy[],
  admin: IUserDoc,
  returnRoleDocs?: boolean,
  scope?: IScopeDoc['_id'],
  user?: IUserDoc | IPendingUserDoc,
): Promise<ICheckPolicyResultUser | ICheckPolicyResultAdmin | true> {
  if (!admin.restricted) {
    const policyDocs = await getPolicyDocuments(policies);
    const { allowedPolicies, adminRole, userRole } = await getUserPolicies(
      admin,
      admin.allowed_policies,
      scope,
      user,
    );
    const policyChecker = checkPolicyArray(policyDocs, allowedPolicies);
    const allPoliciesBoolean = policyChecker.map((policy) => policy.value);
    if (allPoliciesBoolean.includes(false)) {
      throw new Error('This User Does not have Access to this Action');
    } else {
      if (returnRoleDocs) {
        return {
          check: true,
          adminRole,
          userRole,
        };
      } else {
        return true;
      }
    }
  } else {
    throw new Error('This User Account is Restricted, Cannot do any Action');
  }
}
