import { Users } from '@models';
import { users as UserPolicies } from '@plugins/templates/policies';
import { checkPolicy } from '@plugins/auth/helpers';

import type { IScopeDoc, IPolicy, IUserDoc } from '@models/types';

/**
 * Remove a User
 *
 * @async
 * @param {IUserDoc} admin - Admin User with which to Create the User
 * @param {string} scope - Scope for which User Should be Accepted
 * @param {Readonly<IPolicy>} policies - accept policies applicable for the particular user
 * @param {IUserDoc} user - User Object containing Details
 * @returns {boolean} - (true/false)
 */
async function removeUser(
  admin: IUserDoc,
  scope: IScopeDoc['_id'],
  policies: Readonly<IPolicy>[],
  user: IUserDoc,
): Promise<boolean> {
  await checkPolicy(policies, admin, false, scope, user);
  await Users.deleteOne({ _id: user._id });
  return true;
}

/**
 * Remove a Viewer
 *
 * @param {IUserDoc} admin - Admin User with which to Accept the Request
 * @param {string} scope - Scope for which user should be blacklisted
 * @param {IUserDoc} user - user to remove
 * @returns {Promise<boolean>} - true/false
 */
export function viewer(
  admin: IUserDoc,
  scope: IScopeDoc['_id'],
  user: IUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.remove.viewer];
  return removeUser(admin, scope, policies, user);
}

/**
 * Remove a Content Manager
 *
 * @param {IUserDoc} admin - Admin User with which to Accept the Request
 * @param {string} scope - Scope for which user should be blacklisted
 * @param {IUserDoc} user - user to remove
 * @returns {Promise<boolean>} - true/false
 */
export function contentMgr(
  admin: IUserDoc,
  scope: IScopeDoc['_id'],
  user: IUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.remove.contentMgr];
  return removeUser(admin, scope, policies, user);
}

/**
 * Remove a Moderator
 *
 * @param {IUserDoc} admin - Admin User with which to Accept the Request
 * @param {string} scope - Scope for which user should be blacklisted
 * @param {IUserDoc} user - user to remove
 * @returns {Promise<boolean>} - true/false
 */
export function moderator(
  admin: IUserDoc,
  scope: IScopeDoc['_id'],
  user: IUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.remove.mod];
  return removeUser(admin, scope, policies, user);
}

/**
 * Remove a Manager
 *
 * @param {IUserDoc} admin - Admin User with which to Accept the Request
 * @param {string} scope - Scope for which user should be blacklisted
 * @param {IUserDoc} user - user to remove
 * @returns {Promise<boolean>} - true/false
 */
export function manager(
  admin: IUserDoc,
  scope: IScopeDoc['_id'],
  user: IUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.remove.manager];
  return removeUser(admin, scope, policies, user);
}
