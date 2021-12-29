import { Roles } from '@models';
import { retrievePolicies as getPolicyDocuments } from './policy-retriever';
import {
  heirarchyChecker,
  getHighestHeirarchy as getHighestHeir,
} from './heirarchy';

import type { IUserDoc } from '@models/user/types';
import type { IPendingUserDoc } from '@models/pending-user/types';
import type { IRoleDoc } from '@models/role/types';
import type { IPolicy, IPolicyDoc } from '@models/policy/types';
import type { IScopeDoc } from '@models/scope/types';
import type { ID } from '@typs/model.objectid';
import type { Error as MongoError } from 'mongoose';

interface IPolicyChecker {
  policy: string;
  value: boolean;
}

const convertObjectID = (idArray: ID<IPolicyDoc>[]): string[] => {
  const convertedArr = idArray.map((ids) => String(ids));
  return convertedArr;
};

const checkGlobalFlags = (policyDocs: IPolicyDoc[]): Promise<boolean> =>
  new Promise<boolean>((resolve, reject) => {
    const flags: boolean[] = [];
    policyDocs.forEach((policy, index) => {
      flags.push(policy.global_flag);
      if (index === policyDocs.length - 1) {
        if (!flags.includes(false)) {
          resolve(true);
        } else {
          reject(
            new Error(
              'Global Flag is Turned off, Turn on to perform this Action',
            ),
          );
        }
      }
    });
  });

const checkPolicyArray = (
  policyDocs: IPolicyDoc[],
  userPolicies: string[],
): Promise<IPolicyChecker[]> =>
  new Promise<IPolicyChecker[]>((resolve, reject) => {
    checkGlobalFlags(policyDocs)
      .then((enabled) => {
        if (enabled) {
          const policyChecker: IPolicyChecker[] = [];
          policyDocs.forEach((policy, index) => {
            const policyId = policy._id;
            const policyBool = userPolicies.includes(String(policyId));
            policyChecker.push({
              policy: String(policyId),
              value: policyBool,
            });
            if (index === policyDocs.length - 1) {
              resolve(policyChecker);
            }
          });
        } else {
          reject(
            new Error(
              'Global Flag is Turned off, Turn on to perform this Action',
            ),
          );
        }
      })
      .catch((err: string) => reject(new Error(err)));
  });

interface IDeeperRoles {
  roleDoc: IRoleDoc;
  allowedPolicies: ID<IPolicyDoc>[];
}

export const getDeeperRoles = (
  adminRole: string,
  otherPolicies?: ID<IPolicyDoc>[],
): Promise<IDeeperRoles> =>
  new Promise<IDeeperRoles>((resolve, reject) => {
    let userType = '';
    let roleId = adminRole;
    let userPolicies: ID<IPolicyDoc>[] = otherPolicies ? otherPolicies : [];
    while (userType !== 'main') {
      Roles.findById(roleId)
        .then((roleDoc: IRoleDoc | null) => {
          if (roleDoc) {
            userType = roleDoc.type;
            userPolicies = [...roleDoc.allowed_policies, ...userPolicies];
            if (roleDoc.delgates_from) {
              roleId = String(roleDoc.delgates_from);
            }
            if (userType === 'main') {
              const deeperRoles: IDeeperRoles = {
                roleDoc,
                allowedPolicies: userPolicies,
              };
              resolve(deeperRoles);
            }
          } else {
            reject(new Error("Cannot Find User's Role Details"));
          }
        })
        .catch((err: MongoError) => {
          reject(new Error(`${err.name}: ${err.message}`));
        });
    }
  });

interface IUserRole {
  scope: ID<IScopeDoc>;
  role: ID<IRoleDoc>;
}

const getHighestHeirarchy = (roles: IUserRole[]): Promise<IDeeperRoles> =>
  new Promise<IDeeperRoles>((resolve, reject) => {
    const heirarchies: { role: string; deepRoles: IDeeperRoles }[] = [];
    roles.forEach((role, index) => {
      getDeeperRoles(String(role.role))
        .then((deepRoles) =>
          heirarchies.push({
            role: deepRoles.roleDoc.name,
            deepRoles,
          }),
        )
        .then(() => {
          if (index === roles.length - 1) {
            const roleDocs = heirarchies.map(
              (heirarchy) => heirarchy.deepRoles.roleDoc,
            );
            getHighestHeir(roleDocs)
              .then((highestRole) =>
                heirarchies.filter(
                  (heirarchy) => heirarchy.role === highestRole.name,
                ),
              )
              .then(([highestDeepestRole]) =>
                resolve(highestDeepestRole.deepRoles),
              )
              .catch((err: string) => {
                reject(new Error(err));
              });
          }
        })
        .catch((err: string) => {
          reject(new Error(err));
        });
    });
  });

const getUserPolicies = (
  adminRole: string,
  otherPolicies?: ID<IPolicyDoc>[],
  scope?: IScopeDoc['_id'],
  user?: IUserDoc | IPendingUserDoc,
): Promise<string[]> =>
  new Promise<string[]>((resolve, reject) => {
    if (user && scope) {
      const [userRole] = user.roles.filter((role) => role.scope === scope);
      Promise.all([
        getDeeperRoles(String(userRole.role)),
        getDeeperRoles(adminRole, otherPolicies),
      ])
        .then(([userDeepRole, deepRoles]) => {
          const { roleDoc } = userDeepRole;
          const { roleDoc: adminRoleDoc, allowedPolicies } = deepRoles;
          if (heirarchyChecker(adminRoleDoc, roleDoc)) {
            resolve(convertObjectID(allowedPolicies));
          } else {
            reject(
              new Error(
                'This Admin Cannot Perform this action against this User',
              ),
            );
          }
        })
        .catch((err: string) => {
          reject(new Error(err));
        });
    } else if (user && !scope) {
      Promise.all([
        getHighestHeirarchy(user.roles),
        getDeeperRoles(adminRole, otherPolicies),
      ])
        .then(([userDeepRole, deepRoles]) => {
          const { roleDoc } = userDeepRole;
          const { roleDoc: adminRoleDoc, allowedPolicies } = deepRoles;
          if (heirarchyChecker(adminRoleDoc, roleDoc)) {
            resolve(convertObjectID(allowedPolicies));
          } else {
            reject(
              new Error(
                'This Admin Cannot Perform this action against this User',
              ),
            );
          }
        })
        .catch((err: string) => {
          reject(new Error(err));
        });
    } else {
      getDeeperRoles(adminRole, otherPolicies)
        .then((deepRoles) => {
          const { allowedPolicies } = deepRoles;
          resolve(convertObjectID(allowedPolicies));
        })
        .catch((err: string) => {
          reject(new Error(err));
        });
    }
  });

/**
 * Checks the Given Policies to the Given User for the Particular Scope
 *
 * @param {IPolicy[]} policies - Array of Policies to Check
 * @param {IUserDoc} admin - User to which Policy is to be Checked
 * @param {string} scope - Scope ID for which Policies to be checked
 * @param {IUserDoc} user - User to whom Action is applied
 */
export function checkPolicy(
  policies: IPolicy[],
  admin: IUserDoc,
  scope?: IScopeDoc['_id'],
  user?: IUserDoc | IPendingUserDoc,
): Promise<true> {
  return new Promise<true>((resolve, reject) => {
    const [userRole] = admin.roles.filter((role) => role.scope === scope);
    if (!admin.restricted) {
      getPolicyDocuments(policies)
        .then((policyDocs) =>
          Promise.all([
            policyDocs,
            getUserPolicies(
              String(userRole.role),
              admin.allowed_policies,
              scope,
              user,
            ),
          ]),
        )
        .then(([policyDocs, userPolicies]) =>
          checkPolicyArray(policyDocs, userPolicies),
        )
        .then((policyChecker) => policyChecker.map((policy) => policy.value))
        .then((allPoliciesBoolean) => {
          if (allPoliciesBoolean.includes(false)) {
            reject(new Error('This User Does not have Access to this Action'));
          } else {
            resolve(true);
          }
        })
        .catch((err: string) => {
          reject(new Error(err));
        });
    } else {
      reject(
        new Error('This User Account is Restricted, Cannot do any Action'),
      );
    }
  });
}
