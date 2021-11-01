/**
 * @file Policy Definition File
 * @description Policies Related to Removing Various Types of Users
 * @module - User[Remove]
 * @author Sudharshan TK
 */

import { IPolicy } from '@models/policy/types';
import { Types } from 'mongoose';

const objectID = (num: string) => Types.ObjectId(`p-user-r@${num}`);

export const viewer_rm: Readonly<IPolicy> = {
  _id: objectID('001'),
  name: 'Remove Viewer',
  message: 'Enable Removal of Viewers and its Delegates',
  global_flag: true,
};

export const content_mgr_rm: Readonly<IPolicy> = {
  _id: objectID('002'),
  name: 'Remove Content Managers',
  message: 'Enable Removal of Content Managers and Delegates',
  global_flag: true,
};

export const mods_rm: Readonly<IPolicy> = {
  _id: objectID('003'),
  name: 'Remove Moderators',
  message: 'Enable Removal of Moderators and Delegates',
  global_flag: true,
};

export const mgr_rm: Readonly<IPolicy> = {
  _id: objectID('004'),
  name: 'Remove Managers',
  message: 'Enable Removal of Managers and Delegates',
  global_flag: true,
};
