/**
 * Policy Definition File
 *
 * Module - User
 * Sub Module - Blacklist
 *
 * @description Policies Related to Blacklisting Various Types of Users
 */

import type { policySchema } from '@typs/models/policy';

const IDPREFIX = 'usr-blist-';

export const viewer_blist: Readonly<policySchema> = {
  _id: `${IDPREFIX}0001`,
  name: 'Blacklist Viewer',
  message: 'Enable Blacklisting of Viewers and its Delegates',
  global_flag: true,
};

export const content_mgr_blist: Readonly<policySchema> = {
  _id: `${IDPREFIX}0002`,
  name: 'Blacklist Content Managers',
  message: 'Enable Blacklisting of Content Managers and its Delegates',
  global_flag: true,
};

export const mod_blist: Readonly<policySchema> = {
  _id: `${IDPREFIX}0003`,
  name: 'Blacklist Moderators',
  message: 'Enable Blacklisting of Moderators and its Delegates',
  global_flag: true,
};

export const owner_blist: Readonly<policySchema> = {
  _id: `${IDPREFIX}0004`,
  name: 'Blacklist Owners',
  message: 'Enable Blacklisting of Owners and its Delegates',
  global_flag: true,
};
