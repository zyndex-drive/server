/**
 * @file Policy Definition File
 * @description Policies Related to Modifying Info Related to Various Types of Users
 * @module - User[Modify]
 * @author Sudharshan TK
 */

import type { policySchema } from '@typs/models/policy';

const IDPREFIX = 'usr-mod-';

export const viewer_policies: Readonly<policySchema> = {
  _id: `${IDPREFIX}0001`,
  name: 'Edit Policies of Viewer',
  message: 'Enable Granting/Removing Policies to Viewers and its Delegates',
  global_flag: true,
};

export const viewer_scope: Readonly<policySchema> = {
  _id: `${IDPREFIX}0002`,
  name: 'Edit Scopes of Viewers',
  message: 'Enable Granting/Removing of Scopes to Viewers and its Delegates',
  global_flag: true,
};

export const viewer_restrict: Readonly<policySchema> = {
  _id: `${IDPREFIX}0003`,
  name: 'Restrict Viewers',
  message: 'Restrict Users and its Delegates',
  global_flag: true,
};

export const content_mgr_policies: Readonly<policySchema> = {
  _id: `${IDPREFIX}0004`,
  name: 'Edit Policies of Content Manager',
  message:
    'Enable Granting/Removing Policies to Content Managers and its Delegates',
  global_flag: true,
};

export const content_mgr_scope: Readonly<policySchema> = {
  _id: `${IDPREFIX}0005`,
  name: 'Edit Scopes of Content Managers',
  message:
    'Enable Granting/Removing of Scopes to Content Managers and its Delegates',
  global_flag: true,
};

export const content_mgr_restrict: Readonly<policySchema> = {
  _id: `${IDPREFIX}0006`,
  name: 'Restrict Content Managers',
  message: 'Restrict Content Managers and its Delegates',
  global_flag: true,
};

export const mods_policies: Readonly<policySchema> = {
  _id: `${IDPREFIX}0007`,
  name: 'Edit Policies of Moderators',
  message: 'Enable Granting/Removing Policies to Moderators and its Delegates',
  global_flag: true,
};

export const mods_scope: Readonly<policySchema> = {
  _id: `${IDPREFIX}0008`,
  name: 'Edit Scopes of Moderators',
  message: 'Enable Granting/Removing of Scopes to Moderators and its Delegates',
  global_flag: true,
};

export const mods_restrict: Readonly<policySchema> = {
  _id: `${IDPREFIX}0009`,
  name: 'Restrict Moderators',
  message: 'Restrict Moderators and its Delegates',
  global_flag: true,
};

export const mgr_policies: Readonly<policySchema> = {
  _id: `${IDPREFIX}0010`,
  name: 'Edit Policies of Managers',
  message: 'Enable Granting/Removing Policies to Managers and its Delegates',
  global_flag: true,
};

export const mgr_scope: Readonly<policySchema> = {
  _id: `${IDPREFIX}0011`,
  name: 'Edit Scopes of Managers',
  message: 'Enable Granting/Removing of Scopes to Managers and its Delegates',
  global_flag: true,
};

export const mgr_restrict: Readonly<policySchema> = {
  _id: `${IDPREFIX}0012`,
  name: 'Restrict Managers',
  message: 'Restrict Managers and its Delegates',
  global_flag: true,
};
