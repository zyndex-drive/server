/**
 * @file Policy Definition File
 * @description Policies Related to Viewing Various Types of Users
 * @module - User[View]
 * @author Sudharshan TK
 */

import type { IPolicy } from '@models/types';
import { objectID } from '@plugins/misc/uid';

const CODE = 'usr';

export const viewer_view: Readonly<IPolicy> = {
  _id: objectID(),
  code: `${CODE}viewvwr`,
  name: 'View Viewer',
  message: 'Enable Viewing Documents of Viewers and its Delegates',
  global_flag: true,
};

export const content_mgr_view: Readonly<IPolicy> = {
  _id: objectID(),
  code: `${CODE}viewcntmgr`,
  name: 'View Content Managers',
  message: 'Enable Viewing Documents of Content Managers and its Delegates',
  global_flag: true,
};

export const mod_view: Readonly<IPolicy> = {
  _id: objectID(),
  code: `${CODE}viewmdtr`,
  name: 'View Moderators',
  message: 'Enable Viewing Documents of Moderators and its Delegates',
  global_flag: true,
};

export const mgr_view: Readonly<IPolicy> = {
  _id: objectID(),
  code: `${CODE}viewmgr`,
  name: 'View Managers',
  message: 'Enable Viewing Documents of Managers and its Delegates',
  global_flag: true,
};
