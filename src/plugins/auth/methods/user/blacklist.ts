import { objectID } from '@plugins/misc/uid';
import { BlacklistUsers, Users } from '@models';
import { users as UserPolicies } from '@plugins/templates/policies';
import { checkPolicy } from '@plugins/auth/helpers';

import type {
  IScopeDoc,
  IPolicy,
  IUserDoc,
  IBlacklistedUserDoc,
} from '@models/types';

/**
 * Blacklists a User for a Particular Scope
 *
 * @async
 * @param {IUserDoc} admin - Admin User with which to Blacklist the User
 * @param {Readonly<IPolicy>[]} policies - Blacklist Policies applicable for the user
 * @param {string} scope - Scope for which user should be blacklisted
 * @param {IUserDoc} user - user to blacklist
 * @returns {Promise<IBlacklistedUserDoc>} - Blacklisted User Document
 */
async function blacklistUser(
  admin: IUserDoc,
  policies: Readonly<IPolicy>[],
  scope: IScopeDoc['_id'],
  user: IUserDoc,
): Promise<IBlacklistedUserDoc> {
  await checkPolicy(policies, admin, false, scope, user);
  await Users.updateOne({ _id: user._id }, { restricted: true });
  const uid = objectID();
  const newBlacklistUser = new BlacklistUsers({
    _id: uid,
    name: user.name,
    email: user.email,
    flagged_by: admin._id,
    role: user.roles.filter((us) => String(us.scope) === String(scope)),
    blacklisted_from: Date.now(),
  });
  const blacklistUserDoc = await newBlacklistUser.save();
  return blacklistUserDoc;
}

/**
 * Blacklists a Viewer for a Particular Scope
 *
 * @param {IUserDoc} admin - Admin User with which to Blacklist the User
 * @param {string} scope - Scope for which user should be blacklisted
 * @param {IUserDoc} user - user to blacklist
 * @returns {Promise<IBlacklistedUserDoc>} - Blacklisted User Document
 */
export function viewer(
  admin: IUserDoc,
  scope: IScopeDoc['_id'],
  user: IUserDoc,
): Promise<IBlacklistedUserDoc> {
  const policies = [UserPolicies.blacklist.viewer];
  return blacklistUser(admin, policies, scope, user);
}

/**
 * Blacklists a Content Manager for a Particular Scope
 *
 * @param {IUserDoc} admin - Admin User with which to Blacklist the User
 * @param {string} scope - Scope for which user should be blacklisted
 * @param {IUserDoc} user - user to blacklist
 * @returns {Promise<IBlacklistedUserDoc>} - Blacklisted User Document
 */
export function contentMgr(
  admin: IUserDoc,
  scope: IScopeDoc['_id'],
  user: IUserDoc,
): Promise<IBlacklistedUserDoc> {
  const policies = [UserPolicies.blacklist.contentMgr];
  return blacklistUser(admin, policies, scope, user);
}

/**
 * Blacklists a Moderator for a Particular Scope
 *
 * @param {IUserDoc} admin - Admin User with which to Blacklist the User
 * @param {string} scope - Scope for which user should be blacklisted
 * @param {IUserDoc} user - user to blacklist
 * @returns {Promise<IBlacklistedUserDoc>} - Blacklisted User Document
 */
export function moderator(
  admin: IUserDoc,
  scope: IScopeDoc['_id'],
  user: IUserDoc,
): Promise<IBlacklistedUserDoc> {
  const policies = [UserPolicies.blacklist.mods];
  return blacklistUser(admin, policies, scope, user);
}

/**
 * Blacklists a manager for a Particular Scope
 *
 * @param {IUserDoc} admin - Admin User with which to Blacklist the User
 * @param {string} scope - Scope for which user should be blacklisted
 * @param {IUserDoc} user - user to blacklist
 * @returns {Promise<IBlacklistedUserDoc>} - Blacklisted User Document
 */
export function manager(
  admin: IUserDoc,
  scope: IScopeDoc['_id'],
  user: IUserDoc,
): Promise<IBlacklistedUserDoc> {
  const policies = [UserPolicies.blacklist.manager];
  return blacklistUser(admin, policies, scope, user);
}
