import { PendingUsers, Users } from '@models';
import { users as UserPolicies } from '@plugins/templates/policies';
import { checkPolicy } from '@plugins/auth/helpers';

import type { IPendingUserDoc } from '@models/pending-user/types';
import type { IRoleDoc } from '@models/role/types';
import type { IPolicy } from '@models/policy/types';
import type { IUserDoc } from '@models/user/types';
import type { IScopeDoc } from '@models/scope/types';

/**
 * Accept a User as a Particular Role for the Particular Scope
 *
 * @param {IUserDoc} admin - Admin User with which to accept the Request
 * @param {Readonly<IPolicy>[]} policies - Accept Policies applicable to the user
 * @param {string} scope - Scope for which User Should be Accepted
 * @param {IPendingUserDoc} pendingUser - User Object containing Details
 * @param {IUserDoc} user - User to be Upgraded
 * @returns {boolean} - (true/false)
 */
function upgradeUser(
  admin: IUserDoc,
  policies: Readonly<IPolicy>[],
  scope: IScopeDoc['_id'],
  pendingUser: IPendingUserDoc,
  user: IUserDoc,
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    checkPolicy(policies, admin, scope, user)
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
 * Directly Promote a User as a Particular Role for the Particular Scope
 *
 * @param {IUserDoc} admin - Admin User with which to Promote the User
 * @param {Readonly<IPolicy>[]} policies - Accept Policies applicable to the user
 * @param {string} scope - Scope for which User Should be Accepted
 * @param {IRoleDoc} roleDoc - Role to be Upgraded
 * @param {IUserDoc} user - User to be Promoted
 * @returns {boolean} - (true/false)
 */
function directPromote(
  admin: IUserDoc,
  policies: Readonly<IPolicy>[],
  scope: IScopeDoc['_id'],
  roleDoc: IRoleDoc,
  user: IUserDoc,
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    checkPolicy(policies, admin, scope, user)
      .then(() => {
        const filteredRoles = user.roles.filter((role) => role.scope !== scope);
        filteredRoles.push({
          role: roleDoc._id,
          scope,
        });
        const setValues = {
          roles: filteredRoles,
        };
        return Users.updateOne({ _id: user._id }, setValues);
      })
      .then(() => resolve(true))
      .catch((err: string) => {
        reject(new Error(err));
      });
  });
}

/**
 * Promotes a User as a Content Manager for a Particular Scope
 *
 * @param {IUserDoc} admin - Admin User with which to Promote the User
 * @param {string} scope - Scope for which user should be Promoted
 * @param {IPendingUserDoc} pendingUser - Pending User Document from the Database
 * @param {IUserDoc} user - user to blacklist
 * @returns {Promise<boolean>} - true/false
 */
export function contentMgr(
  admin: IUserDoc,
  scope: IScopeDoc['_id'],
  pendingUser: IPendingUserDoc,
  user: IUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.add.promote.contentMgr];
  return upgradeUser(admin, policies, scope, pendingUser, user);
}

/**
 * Promotes a User as a Moderator for a Particular Scope
 *
 * @param {IUserDoc} admin - Admin User with which to Promote the User
 * @param {string} scope - Scope for which user should be Promoted
 * @param {IPendingUserDoc} pendingUser - Pending User Document from the Database
 * @param {IUserDoc} user - user to blacklist
 * @returns {Promise<boolean>} - true/false
 */
export function moderator(
  admin: IUserDoc,
  scope: IScopeDoc['_id'],
  pendingUser: IPendingUserDoc,
  user: IUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.add.promote.mods];
  return upgradeUser(admin, policies, scope, pendingUser, user);
}

/**
 * Promotes a User as a Manager for a Particular Scope
 *
 * @param {IUserDoc} admin - Admin User with which to Promote the User
 * @param {string} scope - Scope for which user should be Promoted
 * @param {IPendingUserDoc} pendingUser - Pending User Document from the Database
 * @param {IUserDoc} user - user to blacklist
 * @returns {Promise<boolean>} - true/false
 */
export function manager(
  admin: IUserDoc,
  scope: IScopeDoc['_id'],
  pendingUser: IPendingUserDoc,
  user: IUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.add.promote.mods];
  return upgradeUser(admin, policies, scope, pendingUser, user);
}

/**
 * Directly Promote a User as a Content Manager for a Particular Scope
 *
 * @param {IUserDoc} admin - Admin User with which to Promote the User
 * @param {string} scope - Scope for which user should be Promoted
 * @param {IRoleDoc} role - Role to be Upgraded
 * @param {IUserDoc} user - user to blacklist
 * @returns {Promise<boolean>} - true/false
 */
export function directPromoteContentMgr(
  admin: IUserDoc,
  scope: IScopeDoc['_id'],
  role: IRoleDoc,
  user: IUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.add.promote.contentMgr];
  return directPromote(admin, policies, scope, role, user);
}

/**
 * Directly Promote a User as a Moderator for a Particular Scope
 *
 * @param {IUserDoc} admin - Admin User with which to Promote the User
 * @param {string} scope - Scope for which user should be Promoted
 * @param {IRoleDoc} role - Role to be Upgraded
 * @param {IUserDoc} user - user to blacklist
 * @returns {Promise<boolean>} - true/false
 */
export function directPromoteModerator(
  admin: IUserDoc,
  scope: IScopeDoc['_id'],
  role: IRoleDoc,
  user: IUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.add.promote.mods];
  return directPromote(admin, policies, scope, role, user);
}

/**
 * Directly Promote a User as a Manager for a Particular Scope
 *
 * @param {IUserDoc} admin - Admin User with which to Promote the User
 * @param {string} scope - Scope for which user should be Promoted
 * @param {IRoleDoc} role - Role to be Upgraded
 * @param {IUserDoc} user - user to blacklist
 * @returns {Promise<boolean>} - true/false
 */
export function directPromoteManager(
  admin: IUserDoc,
  scope: IScopeDoc['_id'],
  role: IRoleDoc,
  user: IUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.add.promote.manager];
  return directPromote(admin, policies, scope, role, user);
}
