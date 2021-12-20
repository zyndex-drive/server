/**
 * @file Policy Definition File
 * @description Policies Related to Adding and Modifying Service Accounts
 * @module - Service Accounts
 * @author Sudharshan TK
 */

import { IPolicy } from '@models/policy/types';
import { objectID } from '@plugins/misc/uid';

const CODE = 'sacacc';

export const sac_add: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}add`,
  name: 'Add Service Account',
  message: 'Enable Adding of Service Accounts to Database',
  global_flag: true,
};

export const sac_edit: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}edit`,
  name: 'Edit Service Account',
  message: 'Enable Editing of Service Accounts in Database',
  global_flag: true,
};

export const sac_rm: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}rm`,
  name: 'Remove Service Account',
  message: 'Enable Removal of Service Accounts from Database',
  global_flag: true,
};
