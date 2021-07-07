/**
 * @file Policy Definition File
 * @description Policies Related to Blacklisting Various Types of Users
 * @module - User[Blacklist]
 * @author Sudharshan TK
 */

import type { IPolicy } from '@models/policy/types';

const IDPREFIX = 'usr@blist-';

export const viewer_blist: Readonly<IPolicy> = {
  _id: `${IDPREFIX}0001`,
  name: 'Blacklist Viewer',
  message: 'Enable Blacklisting of Viewers and its Delegates',
  global_flag: true,
};

export const content_mgr_blist: Readonly<IPolicy> = {
  _id: `${IDPREFIX}0002`,
  name: 'Blacklist Content Managers',
  message: 'Enable Blacklisting of Content Managers and its Delegates',
  global_flag: true,
};

export const mod_blist: Readonly<IPolicy> = {
  _id: `${IDPREFIX}0003`,
  name: 'Blacklist Moderators',
  message: 'Enable Blacklisting of Moderators and its Delegates',
  global_flag: true,
};

export const mgr_blist: Readonly<IPolicy> = {
  _id: `${IDPREFIX}0004`,
  name: 'Blacklist Managers',
  message: 'Enable Blacklisting of Managers and its Delegates',
  global_flag: true,
};
