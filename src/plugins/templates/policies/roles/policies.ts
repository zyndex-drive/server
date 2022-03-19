/**
 * @file Policy Definition File
 * @description Policies Related to Adding and Modifying Sub Roles
 * @module - Role
 * @author Sudharshan TK
 */

import { IPolicy } from '@models/types';
import { objectID } from '@plugins/misc/uid';

const CODE = 'role';

export const roles_add: Readonly<IPolicy> = {
  _id: objectID(),
  code: `${CODE}add`,
  name: 'Add Sub Roles',
  message: 'Enable Creating of Sub Roles',
  global_flag: true,
};

export const roles_edit: Readonly<IPolicy> = {
  _id: objectID(),
  code: `${CODE}edit`,
  name: 'Edit Sub Roles',
  message: 'Enable Editing of Settings related to Sub Roles',
  global_flag: true,
};

export const roles_rm: Readonly<IPolicy> = {
  _id: objectID(),
  code: `${CODE}rm`,
  name: 'Remove Sub Roles',
  message: 'Enable Removal of Sub Roles',
  global_flag: true,
};
