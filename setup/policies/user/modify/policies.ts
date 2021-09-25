/**
 * @file Policy Definition File
 * @description Policies Related to Modifying Info Related to Various Types of Users
 * @module - User[Modify]
 * @author Sudharshan TK
 */

import type { IPolicy } from '@models/policy/types';
import { Types } from 'mongoose';

const objectID = (num: string) => Types.ObjectId(`p-user-m@${num}`);

export const viewer_policies: Readonly<IPolicy> = {
  _id: objectID('001'),
  name: 'Edit Policies of Viewer',
  message: 'Enable Granting/Removing Policies to Viewers and its Delegates',
  global_flag: true,
};

export const viewer_scope: Readonly<IPolicy> = {
  _id: objectID('002'),
  name: 'Edit Scopes of Viewers',
  message: 'Enable Granting/Removing of Scopes to Viewers and its Delegates',
  global_flag: true,
};

export const viewer_restrict: Readonly<IPolicy> = {
  _id: objectID('003'),
  name: 'Restrict Viewers',
  message: 'Restrict Users and its Delegates',
  global_flag: true,
};

export const content_mgr_policies: Readonly<IPolicy> = {
  _id: objectID('004'),
  name: 'Edit Policies of Content Manager',
  message:
    'Enable Granting/Removing Policies to Content Managers and its Delegates',
  global_flag: true,
};

export const content_mgr_scope: Readonly<IPolicy> = {
  _id: objectID('005'),
  name: 'Edit Scopes of Content Managers',
  message:
    'Enable Granting/Removing of Scopes to Content Managers and its Delegates',
  global_flag: true,
};

export const content_mgr_restrict: Readonly<IPolicy> = {
  _id: objectID('006'),
  name: 'Restrict Content Managers',
  message: 'Restrict Content Managers and its Delegates',
  global_flag: true,
};

export const mods_policies: Readonly<IPolicy> = {
  _id: objectID('007'),
  name: 'Edit Policies of Moderators',
  message: 'Enable Granting/Removing Policies to Moderators and its Delegates',
  global_flag: true,
};

export const mods_scope: Readonly<IPolicy> = {
  _id: objectID('008'),
  name: 'Edit Scopes of Moderators',
  message: 'Enable Granting/Removing of Scopes to Moderators and its Delegates',
  global_flag: true,
};

export const mods_restrict: Readonly<IPolicy> = {
  _id: objectID('009'),
  name: 'Restrict Moderators',
  message: 'Restrict Moderators and its Delegates',
  global_flag: true,
};

export const mgr_policies: Readonly<IPolicy> = {
  _id: objectID('010'),
  name: 'Edit Policies of Managers',
  message: 'Enable Granting/Removing Policies to Managers and its Delegates',
  global_flag: true,
};

export const mgr_scope: Readonly<IPolicy> = {
  _id: objectID('011'),
  name: 'Edit Scopes of Managers',
  message: 'Enable Granting/Removing of Scopes to Managers and its Delegates',
  global_flag: true,
};

export const mgr_restrict: Readonly<IPolicy> = {
  _id: objectID('012'),
  name: 'Restrict Managers',
  message: 'Restrict Managers and its Delegates',
  global_flag: true,
};
