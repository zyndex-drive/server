import { ServiceAccs } from '@models';
import {
  viewDatafromDatabase,
  addDatatoDatabase,
  editDatainDatabase,
  deleteDatafromDatabase,
} from '@plugins/auth/helpers';
import { serviceAccounts as serviceAccPolicies } from '@plugins/templates/policies';

import type {
  IServiceAcc,
  IServiceAccDoc,
  IServiceAccLeanDoc,
  IServiceAccModel,
  IUserDoc,
} from '@models/types';
import type {
  IAddDatabaseResult,
  IEditDatabaseResult,
  IDeleteDatabaseResult,
} from '@plugins/auth/helpers/types';
import type { FilterQuery } from 'mongoose';

/**
 * View Service Accounts from the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {FilterQuery<IServiceAccDoc>} filter - Filter Object for Service Accounts Model
 * @returns {Promise<IServiceAccDoc[] | IServiceAccLeanDoc[]>} - Documents for the Filter Provided
 */
function view(
  admin: IUserDoc,
  filter?: FilterQuery<IServiceAccDoc>,
): Promise<IServiceAccDoc[] | IServiceAccLeanDoc[]> {
  const policies = [serviceAccPolicies.view];
  return viewDatafromDatabase<
    IServiceAccDoc,
    IServiceAccLeanDoc,
    IServiceAccModel
  >(ServiceAccs, admin, false, policies, filter);
}

/**
 * Add ServiceAccs in the Database
 *
 * @param {IUserDoc} admin - Admin user to Perform the Action
 * @param {IServiceAcc} data - ServiceAccs Data
 * @returns {Promise<IAddDatabaseResult<IServiceAcc, IServiceAccDoc>>} - ServiceAccs Document from the Database
 */
function add(
  admin: IUserDoc,
  data: IServiceAcc,
): Promise<IAddDatabaseResult<IServiceAcc, IServiceAccDoc>> {
  const policies = [serviceAccPolicies.add];
  return addDatatoDatabase<IServiceAcc, IServiceAccDoc, IServiceAccModel>(
    ServiceAccs,
    data,
    admin,
    policies,
  );
}

/**
 * Edit ServiceAccs in the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {IServiceAccDoc | IServiceAccLeanDoc} data - Data to be Modified
 * @param {Partial<IServiceAccDoc>} modifiedData - Modified Object
 * @returns {Promise<IEditDatabaseResult>} - IEditDatabaseResult
 */
function edit(
  admin: IUserDoc,
  data: IServiceAccDoc | IServiceAccLeanDoc,
  modifiedData: Partial<IServiceAccDoc>,
): Promise<IEditDatabaseResult> {
  const policies = [serviceAccPolicies.edit];
  return editDatainDatabase<IServiceAccDoc, IServiceAccModel>(
    ServiceAccs,
    data._id,
    modifiedData,
    admin,
    policies,
  );
}

/**
 * Delete ServiceAccs from the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {IServiceAccDoc | IServiceAccLeanDoc} data - Data to be Deleted
 * @returns {Promise<IDeleteDatabaseResult>} - IDeleteDatabaseResult
 */
function remove(
  admin: IUserDoc,
  data: IServiceAccDoc | IServiceAccLeanDoc,
): Promise<IDeleteDatabaseResult> {
  const policies = [serviceAccPolicies.remove];
  return deleteDatafromDatabase<IServiceAccDoc, IServiceAccModel>(
    ServiceAccs,
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
