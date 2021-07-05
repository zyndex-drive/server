/**
 * Policy Definition File
 *
 * Module - User
 * Sub Module - Remove
 *
 * @description Policies Related to Removing Various Types of Users
 */

import { policySchema } from '@typs/models/policy';

const IDPREFIX = 'usr-rm-';

export const viewer_rm: Readonly<policySchema> = {
  _id: `${IDPREFIX}0001`,
  name: 'Remove Viewer',
  message: 'Enable Removal of Viewers and its Delegates',
  global_flag: true,
};

export const content_mgr_rm: Readonly<policySchema> = {
  _id: `${IDPREFIX}0002`,
  name: 'Remove Content Managers',
  message: 'Enable Removal of Content Managers and Delegates',
  global_flag: true,
};

export const mods_rm: Readonly<policySchema> = {
  _id: `${IDPREFIX}0003`,
  name: 'Remove Moderators',
  message: 'Enable Removal of Moderators and Delegates',
  global_flag: true,
};

export const owner_rm: Readonly<policySchema> = {
  _id: `${IDPREFIX}0004`,
  name: 'Remove Owners',
  message: 'Enable Removal of Owners and Delegates',
  global_flag: true,
};
