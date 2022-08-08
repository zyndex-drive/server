/**
 * @file Policy Definition File
 * @description Policies Related to Adding and Modifying Credentials
 * @module - Credentials
 * @author Sudharshan TK
 */

import { IPolicy } from '@models/types';
import { objectID } from '@plugins/misc/uid';

const CODE = 'creds';

export const creds_view: Readonly<IPolicy> = {
  _id: objectID(),
  code: `${CODE}view`,
  name: 'View Credentials',
  message: 'Enable Viewing Credentials from Database',
  global_flag: true,
};

export const creds_add: Readonly<IPolicy> = {
  _id: objectID(),
  code: `${CODE}add`,
  name: 'Add Credentials',
  message: 'Enable Adding of Credentials from Database',
  global_flag: true,
};

export const creds_edit: Readonly<IPolicy> = {
  _id: objectID(),
  code: `${CODE}edit`,
  name: 'Edit Credentials',
  message: 'Enable Editing of Credentials from Database',
  global_flag: true,
};

export const creds_rm: Readonly<IPolicy> = {
  _id: objectID(),
  code: `${CODE}rm`,
  name: 'Remove Credentials',
  message: 'Enable Removal of Credentials from Database',
  global_flag: true,
};
