/**
 * @file Role Definition File
 * @description Describes different Properties for each Role in the Organisation
 * @author Sudharshan TK
 *
 * Note: This Will be used only at the time of First Setup
 */

import { IRole } from '@models/role/types';

const IDS = {
  viewer: 'roles@main-0005',
  contentMgr: 'roles@main-0004',
  moderator: 'roles@main-0003',
  manager: 'roles@main-0002',
  owner: 'roles@main-0001',
};

export const viewer: Readonly<IRole> = {
  _id: IDS.viewer,
  name: 'Viewer',
  alias: 'Viewer',
  type: 'main',
  parent_role: IDS.contentMgr,
  allowed_policies: [],
};

export const contentMgr: Readonly<IRole> = {
  _id: IDS.contentMgr,
  name: 'Content Manager',
  alias: 'Content Manager',
  type: 'main',
  parent_role: IDS.moderator,
  child_role: viewer._id,
  allowed_policies: [],
};

export const moderator: Readonly<IRole> = {
  _id: IDS.moderator,
  name: 'Moderator',
  alias: 'Moderator',
  type: 'main',
  parent_role: IDS.owner,
  child_role: IDS.contentMgr,
  allowed_policies: [],
};

export const manager: Readonly<IRole> = {
  _id: IDS.manager,
  name: 'Owner',
  alias: 'Owner',
  type: 'main',
  parent_role: IDS.owner,
  child_role: IDS.moderator,
  allowed_policies: [],
};

export const owner: Readonly<IRole> = {
  _id: IDS.owner,
  name: 'Owner',
  alias: 'Owner',
  type: 'main',
  child_role: IDS.manager,
  allowed_policies: [],
};

export const map = [viewer, contentMgr, moderator, owner];
