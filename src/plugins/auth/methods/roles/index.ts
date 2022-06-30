import { Roles } from '@models';
import {
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
import type { IEditDatabaseResult } from '@plugins/auth/helpers/types';

/**
 * Add Roles in the Database
 *
 * @param {IUserDoc} admin - Admin user to Perform the Action
 * @param {IRole} data - Roles Data
 * @returns {Promise<IRoleDoc>} - Roles Document from the Database
 */
function add(admin: IUserDoc, data: IRole): Promise<IRoleDoc> {
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
 * @returns {Promise<boolean>} - true/false
 */
function remove(admin: IUserDoc, data: IRoleDoc): Promise<boolean> {
  const policies = [rolePolicies.remove];
  const { type } = data;
  if (type !== 'main') {
    return deleteDatafromDatabase<IRoleDoc, IRoleModel>(
      Roles,
      data,
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
  add,
  edit,
  remove,
};
