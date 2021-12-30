import { users as UserPolicies } from '@plugins/templates/policies';
import modifyUser from './modify';

import type { IUserDoc } from '@models/user/types';

interface IUserRestrict {
  restricted: boolean;
}

/**
 * Modify Restriction of a Viewer
 *
 * @param {IUserDoc} admin - Admin User with which to Accept the Request
 * @param {IUserRestrict} restriction - Modified User Scopes
 * @param {IUserDoc} user - User to Modify
 * @returns {Promise<boolean>} - true/false
 */
export function viewer(
  admin: IUserDoc,
  restriction: IUserRestrict,
  user: IUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.modify.viewer.scope];
  return modifyUser<IUserRestrict>(admin, policies, restriction, user);
}

/**
 * Modify Restriction of a Content Manager
 *
 * @param {IUserDoc} admin - Admin User with which to Accept the Request
 * @param {IUserRestrict} restriction - Modified User Scopes
 * @param {IUserDoc} user - User to Modify
 * @returns {Promise<boolean>} - true/false
 */
export function contentMgr(
  admin: IUserDoc,
  restriction: IUserRestrict,
  user: IUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.modify.contentMgr.scope];
  return modifyUser<IUserRestrict>(admin, policies, restriction, user);
}

/**
 * Modify Restriction of a Moderator
 *
 * @param {IUserDoc} admin - Admin User with which to Accept the Request
 * @param {IUserRestrict} restriction - Modified User Scopes
 * @param {IUserDoc} user - User to Modify
 * @returns {Promise<boolean>} - true/false
 */
export function moderator(
  admin: IUserDoc,
  restriction: IUserRestrict,
  user: IUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.modify.mods.scope];
  return modifyUser<IUserRestrict>(admin, policies, restriction, user);
}

/**
 * Modify Restriction of a Manager
 *
 * @param {IUserDoc} admin - Admin User with which to Accept the Request
 * @param {IUserRestrict} restriction - Modified User Scopes
 * @param {IUserDoc} user - User to Modify
 * @returns {Promise<boolean>} - true/false
 */
export function manager(
  admin: IUserDoc,
  restriction: IUserRestrict,
  user: IUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.modify.manager.scope];
  return modifyUser<IUserRestrict>(admin, policies, restriction, user);
}
