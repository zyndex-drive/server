/**
 * @file Policy Definition File
 * @description Policies Related to Adding and Modifying Scopes
 * @module - Scope
 * @author Sudharshan TK
 */

import { IPolicy } from '@models/types';
import { objectID } from '@plugins/misc/uid';

const CODE = 'scp';

export const scope_add: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}add`,
  name: 'Add Scopes',
  message: 'Enable Adding of Scopes to Database',
  global_flag: true,
};

export const scope_edit: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}edit`,
  name: 'Edit Scopes',
  message: 'Enable Editing of Scopes in Database',
  global_flag: true,
};

export const scope_rm: Readonly<IPolicy> = {
  _id: objectID('p'),
  code: `${CODE}rm`,
  name: 'Remove Scopes',
  message: 'Enable Removal of Scopes from Database',
  global_flag: true,
};
