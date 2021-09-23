/**
 * @file Policy Definition File
 * @description Policies Related to Adding and Modifying Frontends
 * @module - Frontends
 * @author Sudharshan TK
 */

import { IPolicy } from '@models/policy/types';
import { Types } from 'mongoose';

const objectID = (num: string) => Types.ObjectId(`pol-fend@${num}`);

export const frontend_add: Readonly<IPolicy> = {
  _id: objectID('001'),
  name: 'Add Frontends',
  message: 'Enable Adding of Frotnends from Database',
  global_flag: true,
};

export const frontend_edit: Readonly<IPolicy> = {
  _id: objectID('002'),
  name: 'Edit Credentials',
  message: 'Enable Editing of Frontend Details from Database',
  global_flag: true,
};

export const frontend_rm: Readonly<IPolicy> = {
  _id: objectID('003'),
  name: 'Remove Credentials',
  message: 'Enable Removal of Frontends from Database',
  global_flag: true,
};
