/**
 * @file Policy Definition File
 * @description Policies Related to Blacklisting Various Types of Users
 * @module - User[Blacklist]
 * @author Sudharshan TK
 */

import type { IPolicy } from '@models/types';
import { objectID } from '@plugins/misc/uid';

const CODE = 'usr';

export const viewer_blist: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}blistvwr`,
  name: 'Blacklist Viewer',
  message: 'Enable Blacklisting of Viewers and its Delegates',
  global_flag: true,
};

export const content_mgr_blist: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}blistcntmgr`,
  name: 'Blacklist Content Managers',
  message: 'Enable Blacklisting of Content Managers and its Delegates',
  global_flag: true,
};

export const mod_blist: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}blistmod`,
  name: 'Blacklist Moderators',
  message: 'Enable Blacklisting of Moderators and its Delegates',
  global_flag: true,
};

export const mgr_blist: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}blistmgr`,
  name: 'Blacklist Managers',
  message: 'Enable Blacklisting of Managers and its Delegates',
  global_flag: true,
};
