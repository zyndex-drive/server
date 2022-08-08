import { SMTPMailers } from '@models';
import {
  viewDatafromDatabase,
  addDatatoDatabase,
  editDatainDatabase,
  deleteDatafromDatabase,
} from '@plugins/auth/helpers';
import { smtpMailers as smtpMailerPolicies } from '@plugins/templates/policies';

import type {
  ISMTPMailer,
  ISMTPMailerDoc,
  ISMTPMailerLeanDoc,
  ISMTPMailerModel,
  IUserDoc,
} from '@models/types';
import type {
  IAddDatabaseResult,
  IEditDatabaseResult,
  IDeleteDatabaseResult,
} from '@plugins/auth/helpers/types';
import type { FilterQuery } from 'mongoose';

/**
 * View SMTP Mailers from the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {FilterQuery<ISMTPMailerDoc>} filter - Filter Object for SMTP Mailers Model
 * @returns {Promise<ISMTPMailerDoc[] | ISMTPMailerLeanDoc[]>} - Documents for the Filter Provided
 */
function view(
  admin: IUserDoc,
  filter?: FilterQuery<ISMTPMailerDoc>,
): Promise<ISMTPMailerDoc[] | ISMTPMailerLeanDoc[]> {
  const policies = [smtpMailerPolicies.view];
  return viewDatafromDatabase<
    ISMTPMailerDoc,
    ISMTPMailerLeanDoc,
    ISMTPMailerModel
  >(SMTPMailers, admin, false, policies, filter);
}

/**
 * Add SMTPMailers in the Database
 *
 * @param {IUserDoc} admin - Admin user to Perform the Action
 * @param {ISMTPMailer} data - SMTPMailers Data
 * @returns {Promise<IAddDatabaseResult<ISMTPMailer, ISMTPMailerDoc>>} - SMTPMailers Document from the Database
 */
function add(
  admin: IUserDoc,
  data: ISMTPMailer,
): Promise<IAddDatabaseResult<ISMTPMailer, ISMTPMailerDoc>> {
  const policies = [smtpMailerPolicies.add];
  return addDatatoDatabase<ISMTPMailer, ISMTPMailerDoc, ISMTPMailerModel>(
    SMTPMailers,
    data,
    admin,
    policies,
  );
}

/**
 * Edit SMTPMailers in the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {ISMTPMailerDoc | ISMTPMailerLeanDoc} data - Data to be Modified
 * @param {Partial<ISMTPMailerDoc>} modifiedData - Modified Object
 * @returns {Promise<IEditDatabaseResult>} - IEditDatabaseResult
 */
function edit(
  admin: IUserDoc,
  data: ISMTPMailerDoc | ISMTPMailerLeanDoc,
  modifiedData: Partial<ISMTPMailerDoc>,
): Promise<IEditDatabaseResult> {
  const policies = [smtpMailerPolicies.edit];
  return editDatainDatabase<ISMTPMailerDoc, ISMTPMailerModel>(
    SMTPMailers,
    data._id,
    modifiedData,
    admin,
    policies,
  );
}

/**
 * Delete SMTPMailers from the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {ISMTPMailerDoc | ISMTPMailerLeanDoc} data - Data to be Deleted
 * @returns {Promise<IDeleteDatabaseResult>} - IDeleteDatabaseResult
 */
function remove(
  admin: IUserDoc,
  data: ISMTPMailerDoc | ISMTPMailerLeanDoc,
): Promise<IDeleteDatabaseResult> {
  const policies = [smtpMailerPolicies.remove];
  return deleteDatafromDatabase<ISMTPMailerDoc, ISMTPMailerModel>(
    SMTPMailers,
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
