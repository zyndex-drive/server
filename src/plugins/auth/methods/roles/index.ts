import { Roles } from '@models';
import {
  viewDatafromDatabase,
  addDatatoDatabase,
  editDatainDatabase,
  deleteDatafromDatabase,
} from '@plugins/auth/helpers';
import { roles as rolePolicies } from '@plugins/templates/policies';
import { NotAllowed } from '@plugins/errors';

import type {
  IRole,
  IRoleDoc,
  IRoleLeanDoc,
  IRoleModel,
  IUserDoc,
} from '@models/types';
import type {
  IAddDatabaseResult,
  IEditDatabaseResult,
  IDeleteDatabaseResult,
} from '@plugins/auth/helpers/types';
import type { FilterQuery } from 'mongoose';

/**
 * View Role Docs from the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {FilterQuery<IRoleDoc>} filter - Filter Object for Roles Model
 * @returns {Promise<IRoleDoc[] | IRoleLeanDoc[]>} - Documents for the Filter Provided
 */
function view(
  admin: IUserDoc,
  filter?: FilterQuery<IRoleDoc>,
): Promise<IRoleDoc[] | IRoleLeanDoc[]> {
  const policies = [rolePolicies.view];
  return viewDatafromDatabase<IRoleDoc, IRoleLeanDoc, IRoleModel>(
    Roles,
    admin,
    true,
    policies,
    filter,
  );
}

/**
 * Add Roles in the Database
 *
 * @param {IUserDoc} admin - Admin user to Perform the Action
 * @param {IRole} data - Roles Data
 * @returns {Promise<IAddDatabaseResult<IRole, IRoleDoc>>} - Roles Document from the Database
 */
function add(
  admin: IUserDoc,
  data: IRole,
): Promise<IAddDatabaseResult<IRole, IRoleDoc>> {
  const policies = [rolePolicies.add];
  const { type } = data;
  if (type !== 'main') {
    return addDatatoDatabase<IRole, IRoleDoc, IRoleModel>(
      Roles,
      data,
      admin,
      policies,
    );
  } else {
    throw new NotAllowed(
      'Not Allowed to add main documents other than predefined documents',
    );
  }
}

/**
 * Edit Roles in the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {IRoleDoc} data - Data to be Modified
 * @param {Partial<IRoleDoc>} modifiedData - Modified Object
 * @returns {Promise<IEditDatabaseResult>} - IEditDatabaseResult
 */
function edit(
  admin: IUserDoc,
  data: IRoleDoc | IRoleLeanDoc,
  modifiedData: Partial<IRoleDoc>,
): Promise<IEditDatabaseResult> {
  const policies = [rolePolicies.edit];
  if (data.type !== 'main') {
    return editDatainDatabase<IRoleDoc, IRoleModel>(
      Roles,
      data._id,
      { $set: modifiedData },
      admin,
      policies,
    );
  } else {
    throw new NotAllowed(
      `You are Not Allowed to edit main Role Document: ${String(data._id)}`,
    );
  }
}

/**
 * Delete Roles from the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {IRoleDoc} data - Data to be Deleted
 * @returns {Promise<IDeleteDatabaseResult>} - IDeleteDatabaseResult
 */
function remove(
  admin: IUserDoc,
  data: IRoleDoc | IRoleLeanDoc,
): Promise<IDeleteDatabaseResult> {
  const policies = [rolePolicies.remove];
  const { type } = data;
  if (type !== 'main') {
    return deleteDatafromDatabase<IRoleDoc, IRoleModel>(
      Roles,
      data._id,
      admin,
      policies,
    );
  } else {
    throw new NotAllowed(
      'Not Allowed to delete main role documents in the database',
    );
  }
}

export default {
  view,
  add,
  edit,
  remove,
};
