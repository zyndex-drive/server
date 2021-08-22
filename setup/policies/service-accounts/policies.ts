/**
 * @file Policy Definition File
 * @description Policies Related to Adding and Modifying Service Accounts
 * @module - Service Accounts
 * @author Sudharshan TK
 */

import { IPolicy } from '@models/policy/types';
import { Types } from 'mongoose';

const objectID = (num: string) => Types.ObjectId(`pol-saac@${num}`);

export const sac_add: Readonly<IPolicy> = {
  _id: objectID('001'),
  name: 'Add Service Account',
  message: 'Enable Adding of Service Accounts to Database',
  global_flag: true,
};

export const sac_edit: Readonly<IPolicy> = {
  _id: objectID('002'),
  name: 'Edit Service Account',
  message: 'Enable Editing of Service Accounts in Database',
  global_flag: true,
};

export const sac_rm: Readonly<IPolicy> = {
  _id: objectID('003'),
  name: 'Remove Service Account',
  message: 'Enable Removal of Service Accounts from Database',
  global_flag: true,
};
