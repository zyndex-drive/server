import { Roles } from '@models';
import { heirarchyChecker } from './heirarchy';

import type { IUserDoc } from '@models/user/types';
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

const checkPolicyArray = (
  policies: IPolicy[],
  userPolicies: string[],
): Promise<IPolicyChecker[]> =>
  new Promise<IPolicyChecker[]>((resolve) => {
    const policyChecker: IPolicyChecker[] = [];
    policies.forEach((policy, index) => {
      const policyId = policy.code;
      const policyBool = userPolicies.includes(String(policyId));
      policyChecker.push({
        policy: String(policyId),
        value: policyBool,
      });
      if (index === policies.length - 1) {
        resolve(policyChecker);
      }
    });
  });

interface IDeeperRoles {
  roleDoc: IRoleDoc;
  allowedPolicies: ID<IPolicyDoc>[];
}

const getDeeperRoles = (
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

const getUserPolicies = (
  adminRole: string,
  otherPolicies?: ID<IPolicyDoc>[],
  user?: IUserDoc,
): Promise<string[]> =>
  new Promise<string[]>((resolve, reject) => {
    if (user) {
      getDeeperRoles(String(user._id))
        .then((userDeepRole) => {
          const { roleDoc } = userDeepRole;
          getDeeperRoles(adminRole, otherPolicies)
            .then((deepRoles) => {
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
 * @param {string} scope - Scope ID for which Policies to be checked
 * @param {IUserDoc} admin - User to which Policy is to be Checked
 * @param {IUserDoc} user - User to whom function is applied
 */
export function checkPolicy(
  policies: IPolicy[],
  scope: IScopeDoc['_id'],
  admin: IUserDoc,
  user?: IUserDoc,
): Promise<true> {
  return new Promise<true>((resolve, reject) => {
    const [userRole] = admin.role.filter((role) => role.scope === scope);
    if (!admin.restricted) {
      getUserPolicies(String(userRole.role), admin.allowed_policies, user)
        .then((userPolicies: string[]) => {
          checkPolicyArray(policies, userPolicies)
            .then((policyChecker) => {
              const allPoliciesBoolean = policyChecker.map(
                (policy) => policy.value,
              );
              if (allPoliciesBoolean.includes(false)) {
                reject(
                  new Error('This User Does not have Access to this Function'),
                );
              } else {
                resolve(true);
              }
            })
            .catch(() => {
              reject(new Error('Unable to Validate User Policies'));
            });
        })
        .catch((err: string) => {
          reject(new Error(err));
        });
    } else {
      reject(
        new Error('This User Account is Restricted, Cannot do any function'),
      );
    }
  });
}
