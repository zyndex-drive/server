/**
 * @file Policy Definition File
 * @description Policies Related to Adding and Modifying Frontends
 * @module - Frontends
 * @author Sudharshan TK
 */

import { policySchema } from '@typs/models/policy';

const IDPREFIX = 'frontend@';

export const frontend_add: Readonly<policySchema> = {
  _id: `${IDPREFIX}0001`,
  name: 'Add Frontends',
  message: 'Enable Adding of Frotnends from Database',
  global_flag: true,
};

export const frontend_edit: Readonly<policySchema> = {
  _id: `${IDPREFIX}0002`,
  name: 'Edit Credentials',
  message: 'Enable Editing of Frontend Details from Database',
  global_flag: true,
};

export const frontend_rm: Readonly<policySchema> = {
  _id: `${IDPREFIX}0003`,
  name: 'Remove Credentials',
  message: 'Enable Removal of Frontends from Database',
  global_flag: true,
};
