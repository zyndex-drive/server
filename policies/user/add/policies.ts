/**
 * Policy Definition File
 *
 * Module - User
 * Sub Module - Add
 *
 * @description Policies Related to Adding Various Types of Users
 */

import type { policySchema } from '@typs/models/policy';

const IDPREFIX = 'usr-add-';

export const viewer_add: Readonly<policySchema> = {
  _id: `${IDPREFIX}0001`,
  name: 'Add Viewer',
  message: 'Enable Accepting of Requests for Viewers and its Delegates',
  global_flag: true,
};

export const content_mgr_add: Readonly<policySchema> = {
  _id: `${IDPREFIX}0002`,
  name: 'Add Content Managers',
  message:
    'Enable Accepting of Requests for Content Managers and its Delegates',
  global_flag: true,
};

export const mod_add: Readonly<policySchema> = {
  _id: `${IDPREFIX}0003`,
  name: 'Add Moderators',
  message: 'Enable Accepting of Requests for Moderators and its Delegates',
  global_flag: true,
};

export const owner_add: Readonly<policySchema> = {
  _id: `${IDPREFIX}0004`,
  name: 'Add Owners',
  message: 'Enable Accepting of Requests for Owners and its Delegates',
  global_flag: true,
};

export const self_content_mgr_add: Readonly<policySchema> = {
  _id: `${IDPREFIX}0005`,
  name: 'Promote to Content Managers',
  message:
    'Enable Promoting of Users to Content Managers without their Request and its Delegates',
  global_flag: true,
};

export const self_mod_add: Readonly<policySchema> = {
  _id: `${IDPREFIX}0006`,
  name: 'Promote to Moderators',
  message:
    'Enable Promoting of Users to Moderators without their Request and its Delegates',
  global_flag: true,
};

export const self_owner_add: Readonly<policySchema> = {
  _id: `${IDPREFIX}0007`,
  name: 'Promote to Owners',
  message:
    'Enable Promoting of Users to Owners without their Request and its Delegates',
  global_flag: true,
};
