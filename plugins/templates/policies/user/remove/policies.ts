/**
 * @file Policy Definition File
 * @description Policies Related to Removing Various Types of Users
 * @module - User[Remove]
 * @author Sudharshan TK
 */

import { IPolicy } from '@models/types';
import { objectID } from '@plugins/misc/uid';

const CODE = 'usr';
export const viewer_rm: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}rmvwr`,
  name: 'Remove Viewer',
  message: 'Enable Removal of Viewers and its Delegates',
  global_flag: true,
};

export const content_mgr_rm: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}rmcntmgr`,
  name: 'Remove Content Managers',
  message: 'Enable Removal of Content Managers and Delegates',
  global_flag: true,
};

export const mods_rm: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}rmmdtr`,
  name: 'Remove Moderators',
  message: 'Enable Removal of Moderators and Delegates',
  global_flag: true,
};

export const mgr_rm: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}rmmgr`,
  name: 'Remove Managers',
  message: 'Enable Removal of Managers and Delegates',
  global_flag: true,
};
