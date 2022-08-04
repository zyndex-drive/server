import { ServiceAccs } from '@models';
import {
  addDatatoDatabase,
  editDatainDatabase,
  deleteDatafromDatabase,
} from '@plugins/auth/helpers';
import { serviceAccounts as serviceAccPolicies } from '@plugins/templates/policies';

import type {
  IServiceAcc,
  IServiceAccDoc,
  IServiceAccModel,
  IUserDoc,
} from '@models/types';
import type {
  IAddDatabaseResult,
  IEditDatabaseResult,
  IDeleteDatabaseResult,
} from '@plugins/auth/helpers/types';

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
 * @param {IServiceAccDoc} data - Data to be Modified
 * @param {Partial<IServiceAccDoc>} modifiedData - Modified Object
 * @returns {Promise<IEditDatabaseResult>} - IEditDatabaseResult
 */
function edit(
  admin: IUserDoc,
  data: IServiceAccDoc,
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
 * @param {IServiceAccDoc} data - Data to be Deleted
 * @returns {Promise<IDeleteDatabaseResult>} - IDeleteDatabaseResult
 */
function remove(
  admin: IUserDoc,
  data: IServiceAccDoc,
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
  add,
  edit,
  remove,
};
