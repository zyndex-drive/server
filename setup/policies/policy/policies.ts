/**
 * @file Policy Definition File
 * @description Policies Related to Modifying Organisation Policies
 * @module - Global Setitngs
 * @author Sudharshan TK
 */

import { policySchema } from '@typs/models/policy';

const IDPREFIX = 'policies@';

export const policies_edit: Readonly<policySchema> = {
  _id: `${IDPREFIX}0001`,
  name: 'Edit Policies',
  message: 'Enable Editing of Organisation Policies',
  global_flag: true,
};
