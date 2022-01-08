/**
 * @file Policy Definition File
 * @description Policies Related to Adding and Modifying Frontends
 * @module - Frontends
 * @author Sudharshan TK
 */

import { IPolicy } from '@models/types';
import { objectID } from '@plugins/misc/uid';

const CODE = 'ftend';
export const frontend_add: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}add`,
  name: 'Add Frontends',
  message: 'Enable Adding of Frotnends from Database',
  global_flag: true,
};

export const frontend_edit: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}edit`,
  name: 'Edit Frontends',
  message: 'Enable Editing of Frontend Details from Database',
  global_flag: true,
};

export const frontend_rm: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}rm`,
  name: 'Remove Frontends',
  message: 'Enable Removal of Frontends from Database',
  global_flag: true,
};
