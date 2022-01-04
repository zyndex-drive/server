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
} from '@models/smtp-mailer/types';
import type { IUserDoc } from '@models/user/types';

/**
 * Add SMTPMailers in the Database
 *
 * @param {IUserDoc} admin - Admin user to Perform the Action
 * @param {ISMTPMailer} data - SMTPMailers Data
 * @returns {Promise<ISMTPMailerDoc>} - SMTPMailers Document from the Database
 */
function add(admin: IUserDoc, data: ISMTPMailer): Promise<ISMTPMailerDoc> {
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
 * @returns {Promise<boolean>} - true/false
 */
function edit(
  admin: IUserDoc,
  data: ISMTPMailerDoc,
  modifiedData: Partial<ISMTPMailerDoc>,
): Promise<boolean> {
  const policies = [smtpMailerPolicies.edit];
  return editDatainDatabase<ISMTPMailerDoc, ISMTPMailerModel>(
    SMTPMailers,
    data,
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
 * @returns {Promise<boolean>} - true/false
 */
function remove(admin: IUserDoc, data: ISMTPMailerDoc): Promise<boolean> {
  const policies = [smtpMailerPolicies.remove];
  return deleteDatafromDatabase<ISMTPMailerDoc, ISMTPMailerModel>(
    SMTPMailers,
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
