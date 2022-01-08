import { PendingUsers } from '@models';
import { users as UserPolicies } from '@plugins/templates/policies';
import { checkPolicy } from '@plugins/auth/helpers';

import type {
  IPendingUserDoc,
  IPolicy,
  IUserDoc,
  IScopeDoc,
} from '@models/types';

/**
 * Accept a User as a Particular Role for the Particular Scope
 *
 * @param {IUserDoc} admin - Admin User with which to Create the User
 * @param {string} scope - Scope for which User Should be Accepted
 * @param {Readonly<IPolicy>} policies - accept policies applicable for the particular user
 * @param {IPendingUserDoc} pendingUser - User Object containing Details
 * @returns {boolean} - (true/false)
 */
function acceptUser(
  admin: IUserDoc,
  scope: IScopeDoc['_id'],
  policies: Readonly<IPolicy>[],
  pendingUser: IPendingUserDoc,
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    checkPolicy(policies, admin, scope, pendingUser)
      .then(() => {
        const setValues = {
          accepted: true,
          accepted_at: Date.now(),
        };
        return PendingUsers.updateOne({ _id: pendingUser._id }, setValues);
      })
      .then(() => resolve(true))
      .catch((err: string) => {
        reject(new Error(err));
      });
  });
}

/**
 * Accepts a User as a Viewer for a Particular Scope
 *
 * @param {IUserDoc} admin - Admin User with which to Accept the Request
 * @param {string} scope - Scope for which user should be blacklisted
 * @param {IUserDoc} user - user to blacklist
 * @returns {Promise<boolean>} - true/false
 */
export function viewer(
  admin: IUserDoc,
  scope: IScopeDoc['_id'],
  user: IPendingUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.add.accept.viewer];
  return acceptUser(admin, scope, policies, user);
}

/**
 * Accepts a User as a Content Manager for a Particular Scope
 *
 * @param {IUserDoc} admin - Admin User with which to Accept the Request
 * @param {string} scope - Scope for which user should be blacklisted
 * @param {IUserDoc} user - user to blacklist
 * @returns {Promise<boolean>} - true/false
 */
export function contentMgr(
  admin: IUserDoc,
  scope: IScopeDoc['_id'],
  user: IPendingUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.add.accept.contentMgr];
  return acceptUser(admin, scope, policies, user);
}

/**
 * Accepts a User as a Moderator for a Particular Scope
 *
 * @param {IUserDoc} admin - Admin User with which to Accept the Request
 * @param {string} scope - Scope for which user should be blacklisted
 * @param {IUserDoc} user - user to blacklist
 * @returns {Promise<boolean>} - true/false
 */
export function moderator(
  admin: IUserDoc,
  scope: IScopeDoc['_id'],
  user: IPendingUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.add.accept.mods];
  return acceptUser(admin, scope, policies, user);
}

/**
 * Accepts a User as a Manager for a Particular Scope
 *
 * @param {IUserDoc} admin - Admin User with which to Accept the Request
 * @param {string} scope - Scope for which user should be blacklisted
 * @param {IUserDoc} user - user to blacklist
 * @returns {Promise<boolean>} - true/false
 */
export function manager(
  admin: IUserDoc,
  scope: IScopeDoc['_id'],
  user: IPendingUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.add.accept.manager];
  return acceptUser(admin, scope, policies, user);
}
