/**
 * @file Policy Definition File
 * @description Policies Related to Adding and Modifying SMTP Providers
 * @module - Smtp Providers
 * @author Sudharshan TK
 */

import { IPolicy } from '@models/policy/types';
import { Types } from 'mongoose';

const objectID = (num: string) => Types.ObjectId(`pol-smpp@${num}`);

export const smtp_provider_add: Readonly<IPolicy> = {
  _id: objectID('001'),
  name: 'Add SMTP Email Providers',
  message: 'Enable Adding of SMTP Email Providers to Database',
  global_flag: true,
};

export const smtp_provider_edit: Readonly<IPolicy> = {
  _id: objectID('002'),
  name: 'Edit SMTP Email Providers',
  message: 'Enable Editing of SMTP Email Providers in Database',
  global_flag: true,
};

export const smtp_provider_rm: Readonly<IPolicy> = {
  _id: objectID('003'),
  name: 'Remove SMTP Email Providers',
  message: 'Enable Removal of SMTP Email Providers from Database',
  global_flag: true,
};
