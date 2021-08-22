/**
 * @file Policy Definition File
 * @description Policies Related to Adding and Modifying Credentials
 * @module - Credentials
 * @author Sudharshan TK
 */

import { IPolicy } from '@models/policy/types';
import { Types } from 'mongoose';

const objectID = (num: string) => Types.ObjectId(`pol-cred@${num}`);

export const creds_add: Readonly<IPolicy> = {
  _id: objectID('001'),
  name: 'Add Credentials to DB',
  message: 'Enable Adding of Credentials from Database',
  global_flag: true,
};

export const creds_edit: Readonly<IPolicy> = {
  _id: objectID('002'),
  name: 'Edit Credentials in DB',
  message: 'Enable Editing of Credentials from Database',
  global_flag: true,
};

export const creds_rm: Readonly<IPolicy> = {
  _id: objectID('003'),
  name: 'Remove Credentials from DB',
  message: 'Enable Removal of Credentials from Database',
  global_flag: true,
};
