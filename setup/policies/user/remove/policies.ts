/**
 * @file Policy Definition File
 * @description Policies Related to Removing Various Types of Users
 * @module - User[Remove]
 * @author Sudharshan TK
 */

import { IPolicy } from '@models/policy/types';

const IDPREFIX = 'usr@rm-';

export const viewer_rm: Readonly<IPolicy> = {
  _id: `${IDPREFIX}0001`,
  name: 'Remove Viewer',
  message: 'Enable Removal of Viewers and its Delegates',
  global_flag: true,
};

export const content_mgr_rm: Readonly<IPolicy> = {
  _id: `${IDPREFIX}0002`,
  name: 'Remove Content Managers',
  message: 'Enable Removal of Content Managers and Delegates',
  global_flag: true,
};

export const mods_rm: Readonly<IPolicy> = {
  _id: `${IDPREFIX}0003`,
  name: 'Remove Moderators',
  message: 'Enable Removal of Moderators and Delegates',
  global_flag: true,
};

export const mgr_rm: Readonly<IPolicy> = {
  _id: `${IDPREFIX}0004`,
  name: 'Remove Managers',
  message: 'Enable Removal of Managers and Delegates',
  global_flag: true,
};
