import { Roles } from '@models';
import {
  addDatatoDatabase,
  editDatainDatabase,
  deleteDatafromDatabase,
} from '@plugins/auth/helpers';
import { credentials as credentialPolicies } from '@plugins/templates/policies';

import type { IRole, IRoleDoc, IRoleModel, IUserDoc } from '@models/types';

/**
 * Add Roles in the Database
 *
 * @param {IUserDoc} admin - Admin user to Perform the Action
 * @param {IRole} data - Roles Data
 * @returns {Promise<IRoleDoc>} - Roles Document from the Database
 */
function add(admin: IUserDoc, data: IRole): Promise<IRoleDoc> {
  const policies = [credentialPolicies.add];
  return addDatatoDatabase<IRole, IRoleDoc, IRoleModel>(
    Roles,
    data,
    admin,
    policies,
  );
}

/**
 * Edit Roles in the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {IRoleDoc} data - Data to be Modified
 * @param {Partial<IRoleDoc>} modifiedData - Modified Object
 * @returns {Promise<boolean>} - true/false
 */
function edit(
  admin: IUserDoc,
  data: IRoleDoc,
  modifiedData: Partial<IRoleDoc>,
): Promise<boolean> {
  const policies = [credentialPolicies.edit];
  return editDatainDatabase<IRoleDoc, IRoleModel>(
    Roles,
    data,
    modifiedData,
    admin,
    policies,
  );
}

/**
 * Delete Roles from the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {IRoleDoc} data - Data to be Deleted
 * @returns {Promise<boolean>} - true/false
 */
function remove(admin: IUserDoc, data: IRoleDoc): Promise<boolean> {
  const policies = [credentialPolicies.remove];
  return deleteDatafromDatabase<IRoleDoc, IRoleModel>(
    Roles,
    data,
    admin,
    policies,
  );
}

export default {
  add,
  edit,
  remove,
};
