/**
 * @file Role Definition File
 * @description Describes different Properties for each Role in the Organisation
 * @author Sudharshan TK
 *
 * Note: This Will be used only at the time of First Setup
 */

import { IRole } from '@models/role/types';
import { Types } from 'mongoose';

// policies
import ownerPolicies from './policies-map/owner';
import managerPolicies from './policies-map/manager';
import moderatorPolicies from './policies-map/moderator';
import contentMgrPolicies from './policies-map/content-manager';

const objectID = (num: string) => Types.ObjectId(`rol-main@${num}`);

const IDS = {
  viewer: objectID('001'),
  contentMgr: objectID('002'),
  moderator: objectID('003'),
  manager: objectID('004'),
  owner: objectID('005'),
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
  allowed_policies: contentMgrPolicies,
};

export const moderator: Readonly<IRole> = {
  _id: IDS.moderator,
  name: 'Moderator',
  alias: 'Moderator',
  type: 'main',
  parent_role: IDS.owner,
  child_role: IDS.contentMgr,
  allowed_policies: moderatorPolicies,
};

export const manager: Readonly<IRole> = {
  _id: IDS.manager,
  name: 'Owner',
  alias: 'Owner',
  type: 'main',
  parent_role: IDS.owner,
  child_role: IDS.moderator,
  allowed_policies: managerPolicies,
};

export const owner: Readonly<IRole> = {
  _id: IDS.owner,
  name: 'Owner',
  alias: 'Owner',
  type: 'main',
  child_role: IDS.manager,
  allowed_policies: ownerPolicies,
};

export const map = [viewer, contentMgr, moderator, owner];
