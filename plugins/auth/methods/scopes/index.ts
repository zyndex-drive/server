import { Scopes } from '@models';
import {
  addDatatoDatabase,
  editDatainDatabase,
  deleteDatafromDatabase,
} from '@plugins/auth/helpers';
import { scopes as scopePolicies } from '@plugins/templates/policies';

import type { IScope, IScopeDoc, IScopeModel } from '@models/scope/types';
import type { IUserDoc } from '@models/user/types';

/**
 * Add Scopes in the Database
 *
 * @param {IUserDoc} admin - Admin user to Perform the Action
 * @param {IScope} data - Scopes Data
 * @returns {Promise<IScopeDoc>} - Scopes Document from the Database
 */
function add(admin: IUserDoc, data: IScope): Promise<IScopeDoc> {
  const policies = [scopePolicies.add];
  return addDatatoDatabase<IScope, IScopeDoc, IScopeModel>(
    Scopes,
    data,
    admin,
    policies,
  );
}

/**
 * Edit Scopes in the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {IScopeDoc} data - Data to be Modified
 * @param {Partial<IScopeDoc>} modifiedData - Modified Object
 * @returns {Promise<boolean>} - true/false
 */
function edit(
  admin: IUserDoc,
  data: IScopeDoc,
  modifiedData: Partial<IScopeDoc>,
): Promise<boolean> {
  const policies = [scopePolicies.edit];
  return editDatainDatabase<IScopeDoc, IScopeModel>(
    Scopes,
    data,
    modifiedData,
    admin,
    policies,
  );
}

/**
 * Delete Scopes from the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {IScopeDoc} data - Data to be Deleted
 * @returns {Promise<boolean>} - true/false
 */
function remove(admin: IUserDoc, data: IScopeDoc): Promise<boolean> {
  const policies = [scopePolicies.remove];
  return deleteDatafromDatabase<IScopeDoc, IScopeModel>(
    Scopes,
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
