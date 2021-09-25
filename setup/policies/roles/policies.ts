/**
 * @file Policy Definition File
 * @description Policies Related to Adding and Modifying Sub Roles
 * @module - Role
 * @author Sudharshan TK
 */

import { IPolicy } from '@models/policy/types';
import { Types } from 'mongoose';

const objectID = (num: string) => Types.ObjectId(`pol-role@${num}`);

export const roles_add: Readonly<IPolicy> = {
  _id: objectID('001'),
  name: 'Add Sub Roles',
  message: 'Enable Creating of Sub Roles',
  global_flag: true,
};

export const roles_edit: Readonly<IPolicy> = {
  _id: objectID('002'),
  name: 'Edit Sub Roles',
  message: 'Enable Editing of Settings related to Sub Roles',
  global_flag: true,
};

export const roles_rm: Readonly<IPolicy> = {
  _id: objectID('003'),
  name: 'Remove Sub Roles',
  message: 'Enable Removal of Sub Roles',
  global_flag: true,
};
