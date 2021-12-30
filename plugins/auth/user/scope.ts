import { users as UserPolicies } from '@plugins/templates/policies';
import modifyUser from './modify';

import type { ID } from '@typs/model.objectid';
import type { IUserDoc } from '@models/user/types';
import type { IScopeDoc } from '@models/scope/types';
import type { IRoleDoc } from '@models/role/types';

interface IModifiedScopes {
  roles: {
    scope: ID<IScopeDoc>;
    role: ID<IRoleDoc>;
  }[];
}

/**
 * Modify Scopes of a Viewer
 *
 * @param {IUserDoc} admin - Admin User with which to Accept the Request
 * @param {IModifiedScopes} modifiedScopes - Modified User Scopes
 * @param {IUserDoc} user - User to Modify
 * @returns {Promise<boolean>} - true/false
 */
export function viewer(
  admin: IUserDoc,
  modifiedScopes: IModifiedScopes,
  user: IUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.modify.viewer.scope];
  return modifyUser<IModifiedScopes>(admin, policies, modifiedScopes, user);
}

/**
 * Modify Scopes of a Content Manager
 *
 * @param {IUserDoc} admin - Admin User with which to Accept the Request
 * @param {IModifiedScopes} modifiedScopes - Modified User Scopes
 * @param {IUserDoc} user - User to Modify
 * @returns {Promise<boolean>} - true/false
 */
export function contentMgr(
  admin: IUserDoc,
  modifiedScopes: IModifiedScopes,
  user: IUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.modify.contentMgr.scope];
  return modifyUser<IModifiedScopes>(admin, policies, modifiedScopes, user);
}

/**
 * Modify Scopes of a Moderator
 *
 * @param {IUserDoc} admin - Admin User with which to Accept the Request
 * @param {IModifiedScopes} modifiedScopes - Modified User Scopes
 * @param {IUserDoc} user - User to Modify
 * @returns {Promise<boolean>} - true/false
 */
export function moderator(
  admin: IUserDoc,
  modifiedScopes: IModifiedScopes,
  user: IUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.modify.mods.scope];
  return modifyUser<IModifiedScopes>(admin, policies, modifiedScopes, user);
}

/**
 * Modify Scopes of a Manager
 *
 * @param {IUserDoc} admin - Admin User with which to Accept the Request
 * @param {IModifiedScopes} modifiedScopes - Modified User Scopes
 * @param {IUserDoc} user - User to Modify
 * @returns {Promise<boolean>} - true/false
 */
export function manager(
  admin: IUserDoc,
  modifiedScopes: IModifiedScopes,
  user: IUserDoc,
): Promise<boolean> {
  const policies = [UserPolicies.modify.manager.scope];
  return modifyUser<IModifiedScopes>(admin, policies, modifiedScopes, user);
}
