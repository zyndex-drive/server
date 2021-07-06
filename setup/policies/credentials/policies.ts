/**
 * @file Policy Definition File
 * @description Policies Related to Adding and Modifying Credentials
 * @module - Credentials
 * @author Sudharshan TK
 */

import { policySchema } from '@typs/models/policy';

const IDPREFIX = 'creds@';

export const creds_add: Readonly<policySchema> = {
  _id: `${IDPREFIX}0001`,
  name: 'Add Credentials to DB',
  message: 'Enable Adding of Credentials from Database',
  global_flag: true,
};

export const creds_edit: Readonly<policySchema> = {
  _id: `${IDPREFIX}0002`,
  name: 'Edit Credentials in DB',
  message: 'Enable Editing of Credentials from Database',
  global_flag: true,
};

export const creds_rm: Readonly<policySchema> = {
  _id: `${IDPREFIX}0003`,
  name: 'Remove Credentials from DB',
  message: 'Enable Removal of Credentials from Database',
  global_flag: true,
};
