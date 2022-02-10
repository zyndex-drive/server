/**
 * @file Policy Definition File
 * @description Policies Related to Adding and Modifying SMTP Mailers
 * @module - Smtp mailers
 * @author Sudharshan TK
 */

import { IPolicy } from '@models/types';
import { objectID } from '@plugins/misc/uid';

const CODE = 'smtpmail';

export const smtp_mailer_add: Readonly<IPolicy> = {
  _id: objectID(),
  code: `${CODE}add`,
  name: 'Add SMTP Emails Accounts',
  message: 'Enable Adding of SMTP Emails Accounts to Database',
  global_flag: true,
};

export const smtp_mailer_edit: Readonly<IPolicy> = {
  _id: objectID(),
  code: `${CODE}edit`,
  name: 'Edit SMTP Emails Accounts',
  message: 'Enable Editing of SMTP Emails Accounts in Database',
  global_flag: true,
};

export const smtp_mailer_rm: Readonly<IPolicy> = {
  _id: objectID(),
  code: `${CODE}rm`,
  name: 'Remove SMTP Emails Accounts',
  message: 'Enable Removal of SMTP Emails Accounts from Database',
  global_flag: true,
};
