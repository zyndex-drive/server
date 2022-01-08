import { Credentials } from '@models';
import {
  addDatatoDatabase,
  editDatainDatabase,
  deleteDatafromDatabase,
} from '@plugins/auth/helpers';
import { credentials as credentialPolicies } from '@plugins/templates/policies';

import type {
  ICredentials,
  ICredentialsDoc,
  ICredentialsModel,
  IUserDoc,
} from '@models/types';

/**
 * Add Credentials in the Database
 *
 * @param {IUserDoc} admin - Admin user to Perform the Action
 * @param {ICredentials} data - Credentials Data
 * @returns {Promise<ICredentialsDoc>} - Credentials Document from the Database
 */
function add(admin: IUserDoc, data: ICredentials): Promise<ICredentialsDoc> {
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
 * @returns {Promise<boolean>} - true/false
 */
function edit(
  admin: IUserDoc,
  data: ICredentialsDoc,
  modifiedData: Partial<ICredentialsDoc>,
): Promise<boolean> {
  const policies = [credentialPolicies.edit];
  return editDatainDatabase<ICredentialsDoc, ICredentialsModel>(
    Credentials,
    data,
    modifiedData,
    admin,
    policies,
  );
}

/**
 * Delete Credentials from the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {ICredentialsDoc} data - Data to be Deleted
 * @returns {Promise<boolean>} - true/false
 */
function remove(admin: IUserDoc, data: ICredentialsDoc): Promise<boolean> {
  const policies = [credentialPolicies.remove];
  return deleteDatafromDatabase<ICredentialsDoc, ICredentialsModel>(
    Credentials,
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
