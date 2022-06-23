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
export const getDeeperRoles = async (
  adminRole: string,
  otherPolicies?: ID<IPolicyDoc>[],
): Promise<IDeeperRoles> => {
  let userType = '';
  let roleId = adminRole;
  let userPolicies: ID<IPolicyDoc>[] = otherPolicies ? otherPolicies : [];
  const deeperRoles = await new Promise<IDeeperRoles>((resolve, reject) => {
    while (userType !== 'main') {
      Roles.findById(roleId)
        .lean()
        .exec()
        .then((roleDoc) => {
          if (roleDoc) {
            userType = roleDoc.type;
            userPolicies = [...roleDoc.allowed_policies, ...userPolicies];
            if (roleDoc.delgates_from) {
              roleId = String(roleDoc.delgates_from);
            }
            resolve({
              roleDoc,
              allowedPolicies: userPolicies,
            });
          } else {
            userType = 'main';
            reject(new Error("Cannot Find User's Role Details"));
          }
        })
        .catch((err) => {
          reject(new Error(err));
        });
    }
  }).catch((err) => {
    throw new Error(err);
  });
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

const getUserPolicies = async (
  admin: IUserDoc,
  otherPolicies?: ID<IPolicyDoc>[],
  scope?: IScopeDoc['_id'],
  user?: IUserDoc | IPendingUserDoc,
): Promise<string[]> => {
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
      return convertObjectID(allowedPolicies);
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
      return convertObjectID(allowedPolicies);
    } else {
      throw new Error(
        'This Admin Cannot Perform this action against this User',
      );
    }
  } else {
    const deepRoles = await getHighestHeirarchy(admin.roles, otherPolicies);
    const { allowedPolicies } = deepRoles;
    return convertObjectID(allowedPolicies);
  }
};

/**
 * Checks the Given Policies to the Given User for the Particular Scope
 *
 * @async
 * @param {IPolicy[]} policies - Array of Policies to Check
 * @param {IUserDoc} admin - User to which Policy is to be Checked
 * @param {string} scope - Scope ID for which Policies to be checked
 * @param {IUserDoc} user - User to whom Action is applied
 * @returns {Promise<true>} - always resolves to true or throws error
 */
export async function checkPolicy(
  policies: IPolicy[],
  admin: IUserDoc,
  scope?: IScopeDoc['_id'],
  user?: IUserDoc | IPendingUserDoc,
): Promise<true> {
  if (!admin.restricted) {
    const policyDocs = await getPolicyDocuments(policies);
    const userPolicies = await getUserPolicies(
      admin,
      admin.allowed_policies,
      scope,
      user,
    );
    const policyChecker = checkPolicyArray(policyDocs, userPolicies);
    const allPoliciesBoolean = policyChecker.map((policy) => policy.value);
    if (allPoliciesBoolean.includes(false)) {
      throw new Error('This User Does not have Access to this Action');
    } else {
      return true;
    }
  } else {
    throw new Error('This User Account is Restricted, Cannot do any Action');
  }
}
