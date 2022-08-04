import { SMTPProviders } from '@models';
import {
  addDatatoDatabase,
  editDatainDatabase,
  deleteDatafromDatabase,
} from '@plugins/auth/helpers';
import { smtpProviders as smtpProvidersPolicies } from '@plugins/templates/policies';

import type {
  ISMTPProvider,
  ISMTPProviderDoc,
  ISMTPProviderModel,
  IUserDoc,
} from '@models/types';
import type {
  IAddDatabaseResult,
  IEditDatabaseResult,
  IDeleteDatabaseResult,
} from '@plugins/auth/helpers/types';

/**
 * Add SMTPProviders in the Database
 *
 * @param {IUserDoc} admin - Admin user to Perform the Action
 * @param {ISMTPProvider} data - SMTPProviders Data
 * @returns {Promise<IAddDatabaseResult<ISMTPProvider, ISMTPProviderDoc>>} - SMTPProviders Document from the Database
 */
function add(
  admin: IUserDoc,
  data: ISMTPProvider,
): Promise<IAddDatabaseResult<ISMTPProvider, ISMTPProviderDoc>> {
  const policies = [smtpProvidersPolicies.add];
  return addDatatoDatabase<ISMTPProvider, ISMTPProviderDoc, ISMTPProviderModel>(
    SMTPProviders,
    data,
    admin,
    policies,
  );
}

/**
 * Edit SMTPProviders in the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {ISMTPProviderDoc} data - Data to be Modified
 * @param {Partial<ISMTPProviderDoc>} modifiedData - Modified Object
 * @returns {Promise<IEditDatabaseResult>} - IEditDatabaseResult
 */
function edit(
  admin: IUserDoc,
  data: ISMTPProviderDoc,
  modifiedData: Partial<ISMTPProviderDoc>,
): Promise<IEditDatabaseResult> {
  const policies = [smtpProvidersPolicies.edit];
  return editDatainDatabase<ISMTPProviderDoc, ISMTPProviderModel>(
    SMTPProviders,
    data._id,
    modifiedData,
    admin,
    policies,
  );
}

/**
 * Delete SMTPProviders from the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {ISMTPProviderDoc} data - Data to be Deleted
 * @returns {Promise<IDeleteDatabaseResult>} - IDeleteDatabaseResult
 */
function remove(
  admin: IUserDoc,
  data: ISMTPProviderDoc,
): Promise<IDeleteDatabaseResult> {
  const policies = [smtpProvidersPolicies.remove];
  return deleteDatafromDatabase<ISMTPProviderDoc, ISMTPProviderModel>(
    SMTPProviders,
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
