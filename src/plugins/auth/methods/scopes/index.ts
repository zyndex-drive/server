import { Scopes } from '@models';
import {
  viewDatafromDatabase,
  addDatatoDatabase,
  editDatainDatabase,
  deleteDatafromDatabase,
} from '@plugins/auth/helpers';
import { scopes as scopePolicies } from '@plugins/templates/policies';

import type {
  IScope,
  IScopeDoc,
  IScopeLeanDoc,
  IScopeModel,
  IUserDoc,
} from '@models/types';
import type {
  IAddDatabaseResult,
  IEditDatabaseResult,
  IDeleteDatabaseResult,
} from '@plugins/auth/helpers/types';
import type { FilterQuery } from 'mongoose';

/**
 * View Scope Docs from the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {FilterQuery<IScopeDoc>} filter - Filter Object for Scope Model
 * @returns {Promise<IScopeDoc[] | IScopeLeanDoc[]>} - Documents for the Filter Provided
 */
function view(
  admin: IUserDoc,
  filter?: FilterQuery<IScopeDoc>,
): Promise<IScopeDoc[] | IScopeLeanDoc[]> {
  const policies = [scopePolicies.view];
  return viewDatafromDatabase<IScopeDoc, IScopeLeanDoc, IScopeModel>(
    Scopes,
    admin,
    true,
    policies,
    filter,
  );
}

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
 * @param {IScopeDoc | IScopeLeanDoc} data - Data to be Modified
 * @param {Partial<IScopeDoc>} modifiedData - Modified Object
 * @returns {Promise<IEditDatabaseResult>} - IEditDatabaseResult
 */
function edit(
  admin: IUserDoc,
  data: IScopeDoc | IScopeLeanDoc,
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
 * @param {IScopeDoc | IScopeLeanDoc} data - Data to be Deleted
 * @returns {Promise<IDeleteDatabaseResult>} - IDeleteDatabaseResult
 */
function remove(
  admin: IUserDoc,
  data: IScopeDoc | IScopeLeanDoc,
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
  view,
  add,
  edit,
  remove,
};
