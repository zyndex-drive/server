import { Roles } from '@models';

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
      const policyId = policy._id;
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

const getUserPolicies = (userRole: string): Promise<string[]> =>
  new Promise<string[]>((resolve, reject) => {
    let userType = '';
    let roleId = userRole;
    while (userType !== 'main') {
      Roles.findById(roleId)
        .then((roleDoc: IRoleDoc | null) => {
          if (roleDoc) {
            userType = roleDoc.type;
            const userPolicies = roleDoc.allowed_policies;
            const stringizedPolicies = convertObjectID(userPolicies);
            if (roleDoc.delgates_from) {
              roleId = String(roleDoc.delgates_from);
            }
            if (userType === 'main') {
              resolve(stringizedPolicies);
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

/**
 * Checks the Given Policies to the Given User for the Particular Scope
 *
 * @param {IPolicy[]} policies - Array of Policies to Check
 * @param {string} scope - Scope ID for which Policies to be checked
 * @param {IUserDoc} user - User to which Policy is to be Checked
 */
export function checkPolicy(
  policies: IPolicy[],
  scope: IScopeDoc['_id'],
  user: IUserDoc,
): Promise<true> {
  return new Promise<true>((resolve, reject) => {
    const [userRole] = user.role.filter((role) => role.scope === scope);
    getUserPolicies(String(userRole.role))
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
  });
}
