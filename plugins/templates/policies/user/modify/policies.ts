/**
 * @file Policy Definition File
 * @description Policies Related to Modifying Info Related to Various Types of Users
 * @module - User[Modify]
 * @author Sudharshan TK
 */

import type { IPolicy } from '@models/types';
import { objectID } from '@plugins/misc/uid';

const CODE = 'usr';

export const viewer_policies: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}polvwr`,
  name: 'Edit Policies of Viewer',
  message: 'Enable Granting/Removing Policies to Viewers and its Delegates',
  global_flag: true,
};

export const viewer_scope: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}scpvwr`,
  name: 'Edit Scopes of Viewers',
  message: 'Enable Granting/Removing of Scopes to Viewers and its Delegates',
  global_flag: true,
};

export const viewer_restrict: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}restvwr`,
  name: 'Restrict Viewers',
  message: 'Restrict Users and its Delegates',
  global_flag: true,
};

export const content_mgr_policies: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}polcntmgr`,
  name: 'Edit Policies of Content Manager',
  message:
    'Enable Granting/Removing Policies to Content Managers and its Delegates',
  global_flag: true,
};

export const content_mgr_scope: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}scpcntmgr`,
  name: 'Edit Scopes of Content Managers',
  message:
    'Enable Granting/Removing of Scopes to Content Managers and its Delegates',
  global_flag: true,
};

export const content_mgr_restrict: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}restcntmgr`,
  name: 'Restrict Content Managers',
  message: 'Restrict Content Managers and its Delegates',
  global_flag: true,
};

export const mods_policies: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}polmdtr`,
  name: 'Edit Policies of Moderators',
  message: 'Enable Granting/Removing Policies to Moderators and its Delegates',
  global_flag: true,
};

export const mods_scope: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}scpmdtr`,
  name: 'Edit Scopes of Moderators',
  message: 'Enable Granting/Removing of Scopes to Moderators and its Delegates',
  global_flag: true,
};

export const mods_restrict: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}restmdtr`,
  name: 'Restrict Moderators',
  message: 'Restrict Moderators and its Delegates',
  global_flag: true,
};

export const mgr_policies: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}polmgr`,
  name: 'Edit Policies of Managers',
  message: 'Enable Granting/Removing Policies to Managers and its Delegates',
  global_flag: true,
};

export const mgr_scope: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}scpmgr`,
  name: 'Edit Scopes of Managers',
  message: 'Enable Granting/Removing of Scopes to Managers and its Delegates',
  global_flag: true,
};

export const mgr_restrict: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}restmgr`,
  name: 'Restrict Managers',
  message: 'Restrict Managers and its Delegates',
  global_flag: true,
};
