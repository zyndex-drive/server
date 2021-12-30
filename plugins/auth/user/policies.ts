import { users as UserPolicies } from '@plugins/templates/policies';
import modifyUser from './modify';

import type { ID } from '@typs/model.objectid';
import type { IUserDoc } from '@models/user/types';
import type { IPolicyDoc } from '@models/policy/types';

interface IModifiedPolicies {
  allowed_policies?: ID<IPolicyDoc>[];
  disallowed_policies?: ID<IPolicyDoc>[];
}

/**
 * Modify Policies of a Viewer
 *
 * @param {IUserDoc} admin - Admin User with which to Accept the Request
 * @param {IModifiedPolicies} modifiedPolicies - Modified Policies for the User
 * @param {IUserDoc} user - User to Modify
 * @returns {Promise<boolean>} - true/false
 */
export function viewer(
  admin: IUserDoc,
  modifiedPolicies: IModifiedPolicies,
  user: IUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.modify.viewer.policy];
  return modifyUser<IModifiedPolicies>(admin, policies, modifiedPolicies, user);
}

/**
 * Modify Policies of a Content Manager
 *
 * @param {IUserDoc} admin - Admin User with which to Accept the Request
 * @param {IModifiedPolicies} modifiedPolicies - Modified Policies for the User
 * @param {IUserDoc} user - User to Modify
 * @returns {Promise<boolean>} - true/false
 */
export function contentMgr(
  admin: IUserDoc,
  modifiedPolicies: IModifiedPolicies,
  user: IUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.modify.contentMgr.policy];
  return modifyUser<IModifiedPolicies>(admin, policies, modifiedPolicies, user);
}

/**
 * Modify Policies of a Moderator
 *
 * @param {IUserDoc} admin - Admin User with which to Accept the Request
 * @param {IModifiedPolicies} modifiedPolicies - Modified Policies for the User
 * @param {IUserDoc} user - User to Modify
 * @returns {Promise<boolean>} - true/false
 */
export function moderator(
  admin: IUserDoc,
  modifiedPolicies: IModifiedPolicies,
  user: IUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.modify.mods.policy];
  return modifyUser<IModifiedPolicies>(admin, policies, modifiedPolicies, user);
}

/**
 * Modify Policies of a Manager
 *
 * @param {IUserDoc} admin - Admin User with which to Accept the Request
 * @param {IModifiedPolicies} modifiedPolicies - Modified Policies for the User
 * @param {IUserDoc} user - User to Modify
 * @returns {Promise<boolean>} - true/false
 */
export function manager(
  admin: IUserDoc,
  modifiedPolicies: IModifiedPolicies,
  user: IUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.modify.manager.policy];
  return modifyUser<IModifiedPolicies>(admin, policies, modifiedPolicies, user);
}
