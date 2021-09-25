/**
 * @file Policy Definition File
 * @description Policies Related to Blacklisting Various Types of Users
 * @module - User[Blacklist]
 * @author Sudharshan TK
 */

import type { IPolicy } from '@models/policy/types';
import { Types } from 'mongoose';

const objectID = (num: string) => Types.ObjectId(`p-user-b@${num}`);

export const viewer_blist: Readonly<IPolicy> = {
  _id: objectID('001'),
  name: 'Blacklist Viewer',
  message: 'Enable Blacklisting of Viewers and its Delegates',
  global_flag: true,
};

export const content_mgr_blist: Readonly<IPolicy> = {
  _id: objectID('002'),
  name: 'Blacklist Content Managers',
  message: 'Enable Blacklisting of Content Managers and its Delegates',
  global_flag: true,
};

export const mod_blist: Readonly<IPolicy> = {
  _id: objectID('003'),
  name: 'Blacklist Moderators',
  message: 'Enable Blacklisting of Moderators and its Delegates',
  global_flag: true,
};

export const mgr_blist: Readonly<IPolicy> = {
  _id: objectID('004'),
  name: 'Blacklist Managers',
  message: 'Enable Blacklisting of Managers and its Delegates',
  global_flag: true,
};
