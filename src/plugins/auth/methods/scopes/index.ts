import { Scopes } from '@models';
import {
  addDatatoDatabase,
  editDatainDatabase,
  deleteDatafromDatabase,
} from '@plugins/auth/helpers';
import { scopes as scopePolicies } from '@plugins/templates/policies';

import type { IScope, IScopeDoc, IScopeModel, IUserDoc } from '@models/types';
import type {
  IAddDatabaseResult,
  IEditDatabaseResult,
  IDeleteDatabaseResult,
} from '@plugins/auth/helpers/types';

/**
 * Add Scopes in the Database
 *
 * @param {IUserDoc} admin - Admin user to Perform the Action
 * @param {IScope} data - Scopes Data
 * @returns {Promise<IAddDatabaseResult<IScope, IScopeDoc>>} - Scopes Document from the Database
 */
function add(
  admin: IUserDoc,
  data: IScope,
): Promise<IAddDatabaseResult<IScope, IScopeDoc>> {
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
 * @returns {Promise<IEditDatabaseResult>} - IEditDatabaseResult
 */
function edit(
  admin: IUserDoc,
  data: IScopeDoc,
  modifiedData: Partial<IScopeDoc>,
): Promise<IEditDatabaseResult> {
  const policies = [scopePolicies.edit];
  return editDatainDatabase<IScopeDoc, IScopeModel>(
    Scopes,
    data._id,
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
 * @returns {Promise<IDeleteDatabaseResult>} - IDeleteDatabaseResult
 */
function remove(
  admin: IUserDoc,
  data: IScopeDoc,
): Promise<IDeleteDatabaseResult> {
  const policies = [scopePolicies.remove];
  return deleteDatafromDatabase<IScopeDoc, IScopeModel>(
    Scopes,
    data._id,
    admin,
    policies,
  );
}

export default {
  add,
  edit,
  remove,
};
