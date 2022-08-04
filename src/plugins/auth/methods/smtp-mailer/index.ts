import { SMTPMailers } from '@models';
import {
  addDatatoDatabase,
  editDatainDatabase,
  deleteDatafromDatabase,
} from '@plugins/auth/helpers';
import { smtpMailers as smtpMailerPolicies } from '@plugins/templates/policies';

import type {
  ISMTPMailer,
  ISMTPMailerDoc,
  ISMTPMailerModel,
  IUserDoc,
} from '@models/types';
import type {
  IAddDatabaseResult,
  IEditDatabaseResult,
  IDeleteDatabaseResult,
} from '@plugins/auth/helpers/types';

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
 * @param {ISMTPMailerDoc} data - Data to be Modified
 * @param {Partial<ISMTPMailerDoc>} modifiedData - Modified Object
 * @returns {Promise<IEditDatabaseResult>} - IEditDatabaseResult
 */
function edit(
  admin: IUserDoc,
  data: ISMTPMailerDoc,
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
 * @param {ISMTPMailerDoc} data - Data to be Deleted
 * @returns {Promise<IDeleteDatabaseResult>} - IDeleteDatabaseResult
 */
function remove(
  admin: IUserDoc,
  data: ISMTPMailerDoc,
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
  add,
  edit,
  remove,
};
