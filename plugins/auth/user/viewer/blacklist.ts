import { objectID } from '@plugins/misc/uid';
import { BlacklistUsers, Users } from '@models';
import { users as UserPolicies } from '@plugins/templates/policies';
import { checkPolicy } from '@plugins/auth/helpers/policy-checker';

import type { Error as MongoError } from 'mongoose';
import type { IScopeDoc } from '@models/scope/types';
import type { IUserDoc } from '@models/user/types';
import type {
  IBlacklistedUser,
  IBlacklistedUserDoc,
} from '@models/blacklisted-user/types';

/**
 * Blacklist a Viewer for a Particular Scope
 *
 * @param {IUserDoc} admin - Admin User with which to Blacklist the User
 * @param {string} scope - Scope for which user should be blacklisted
 * @param {IUserDoc} user - user to blacklist
 * @returns {Promise<IBlacklistedUserDoc>} - Blacklisted User Document
 */
export default function (
  admin: IUserDoc,
  scope: IScopeDoc['_id'],
  user: IUserDoc,
): Promise<IBlacklistedUserDoc> {
  return new Promise<IBlacklistedUserDoc>((resolve, reject) => {
    const blacklistPolicies = [UserPolicies.blacklist.viewer];
    checkPolicy(blacklistPolicies, scope, admin, user)
      .then((policyCheck) => {
        if (policyCheck) {
          Users.updateOne({ _id: user._id }, { restricted: true })
            .then(() => {
              const uid = objectID('b');
              const blacklistUser: IBlacklistedUser = {
                _id: uid,
                name: user.name,
                email: user.email,
                flagged_by: admin._id,
                role: user.role.filter(
                  (us) => String(us.scope) === String(scope),
                ),
                blacklisted_from: Date.now(),
              };
              const newBlacklistUser = new BlacklistUsers(blacklistUser);
              newBlacklistUser
                .save()
                .then(resolve)
                .catch((err: MongoError) => {
                  reject(new Error(`${err.name}: ${err.message}`));
                });
            })
            .catch((err: MongoError) => {
              reject(new Error(`${err.name}: ${err.message}`));
            });
        }
      })
      .catch((err: string) => {
        reject(new Error(err));
      });
  });
}
