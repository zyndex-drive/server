/**
 * @file Policy Definition File
 * @description Policies Related to Adding and Modifying Templates
 * @module - Templates
 * @author Sudharshan TK
 */

import { IPolicy } from '@models/types';
import { objectID } from '@plugins/misc/uid';

const CODE = 'template';

export const templates_add: Readonly<IPolicy> = {
  _id: objectID(),
  code: `${CODE}add`,
  name: 'Add Templates to Database',
  message: 'Enable Adding of Templates to Database',
  global_flag: true,
};

export const templates_edit: Readonly<IPolicy> = {
  _id: objectID(),
  code: `${CODE}edit`,
  name: 'Edit Templates',
  message: 'Enable Editing of Templates in Database',
  global_flag: true,
};

export const templates_rm: Readonly<IPolicy> = {
  _id: objectID(),
  code: `${CODE}rm`,
  name: 'Remove Templates',
  message: 'Enable Removal of Templates from Database',
  global_flag: true,
};
