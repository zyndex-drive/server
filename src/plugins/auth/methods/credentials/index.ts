import { Credentials } from '@models';
import {
  viewDatafromDatabase,
  addDatatoDatabase,
  editDatainDatabase,
  deleteDatafromDatabase,
} from '@plugins/auth/helpers';
import { credentials as credentialPolicies } from '@plugins/templates/policies';

import type {
  ICredentials,
  ICredentialsDoc,
  ICredentialsLeanDoc,
  ICredentialsModel,
  IUserDoc,
} from '@models/types';
import type {
  IAddDatabaseResult,
  IEditDatabaseResult,
  IDeleteDatabaseResult,
} from '@plugins/auth/helpers/types';
import type { FilterQuery } from 'mongoose';

/**
 * View Credentials from the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {FilterQuery<ICredentialsDoc>} filter - Filter Object for Credentials Model
 * @returns {Promise<ICredentialsDoc[] | ICredentialsLeanDoc[]>} - Documents for the Filter Provided
 */
function view(
  admin: IUserDoc,
  filter?: FilterQuery<ICredentialsDoc>,
): Promise<ICredentialsDoc[] | ICredentialsLeanDoc[]> {
  const policies = [credentialPolicies.view];
  return viewDatafromDatabase<
    ICredentialsDoc,
    ICredentialsLeanDoc,
    ICredentialsModel
  >(Credentials, admin, false, policies, filter);
}

/**
 * Add Credentials in the Database
 *
 * @param {IUserDoc} admin - Admin user to Perform the Action
 * @param {ICredentials} data - Credentials Data
 * @returns {Promise<IAddDatabaseResult<ICredentials, ICredentialsDoc>>} - Credentials Document from the Database
 */
function add(
  admin: IUserDoc,
  data: ICredentials,
): Promise<IAddDatabaseResult<ICredentials, ICredentialsDoc>> {
  const policies = [credentialPolicies.add];
  return addDatatoDatabase<ICredentials, ICredentialsDoc, ICredentialsModel>(
    Credentials,
    data,
    admin,
    policies,
  );
}

/**
 * Edit Credentials in the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {ICredentialsDoc} data - Data to be Modified
 * @param {Partial<ICredentialsDoc>} modifiedData - Modified Object
 * @returns {Promise<IEditDatabaseResult>} - IEditDatabaseResult
 */
function edit(
  admin: IUserDoc,
  data: ICredentialsDoc | ICredentialsLeanDoc,
  modifiedData: Partial<ICredentialsDoc>,
): Promise<IEditDatabaseResult> {
  const policies = [credentialPolicies.edit];
  return editDatainDatabase<ICredentialsDoc, ICredentialsModel>(
    Credentials,
    data._id,
    modifiedData,
    admin,
    policies,
  );
}

/**
 * Delete Credentials from the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {ICredentialsDoc | ICredentialsLeanDoc} data - Data to be Deleted
 * @returns {Promise<IDeleteDatabaseResult>} - IDeleteDatabaseResult
 */
function remove(
  admin: IUserDoc,
  data: ICredentialsDoc | ICredentialsLeanDoc,
): Promise<IDeleteDatabaseResult> {
  const policies = [credentialPolicies.remove];
  return deleteDatafromDatabase<ICredentialsDoc, ICredentialsModel>(
    Credentials,
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
