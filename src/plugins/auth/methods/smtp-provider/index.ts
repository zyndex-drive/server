import { SMTPProviders } from '@models';
import {
  viewDatafromDatabase,
  addDatatoDatabase,
  editDatainDatabase,
  deleteDatafromDatabase,
} from '@plugins/auth/helpers';
import { smtpProviders as smtpProvidersPolicies } from '@plugins/templates/policies';

import type {
  ISMTPProvider,
  ISMTPProviderDoc,
  ISMTPProviderLeanDoc,
  ISMTPProviderModel,
  IUserDoc,
} from '@models/types';
import type {
  IAddDatabaseResult,
  IEditDatabaseResult,
  IDeleteDatabaseResult,
} from '@plugins/auth/helpers/types';
import type { FilterQuery } from 'mongoose';

/**
 * View SMTP Providers from the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {FilterQuery<ISMTPProviderDoc>} filter - Filter Object for SMTP Providers Model
 * @returns {Promise<ISMTPProviderDoc[] | ISMTPProviderLeanDoc[]>} - Documents for the Filter Provided
 */
function view(
  admin: IUserDoc,
  filter?: FilterQuery<ISMTPProviderDoc>,
): Promise<ISMTPProviderDoc[] | ISMTPProviderLeanDoc[]> {
  const policies = [smtpProvidersPolicies.view];
  return viewDatafromDatabase<
    ISMTPProviderDoc,
    ISMTPProviderLeanDoc,
    ISMTPProviderModel
  >(SMTPProviders, admin, false, policies, filter);
}

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
 * @param {ISMTPProviderDoc | ISMTPProviderLeanDoc} data - Data to be Modified
 * @param {Partial<ISMTPProviderDoc>} modifiedData - Modified Object
 * @returns {Promise<IEditDatabaseResult>} - IEditDatabaseResult
 */
function edit(
  admin: IUserDoc,
  data: ISMTPProviderDoc | ISMTPProviderLeanDoc,
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
 * @param {ISMTPProviderDoc | ISMTPProviderLeanDoc} data - Data to be Deleted
 * @returns {Promise<IDeleteDatabaseResult>} - IDeleteDatabaseResult
 */
function remove(
  admin: IUserDoc,
  data: ISMTPProviderDoc | ISMTPProviderLeanDoc,
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
  view,
  add,
  edit,
  remove,
};
