/**
 * @file Policy Definition File
 * @description Policies Related to Modifying Organisation Policies
 * @module - Global Setitngs
 * @author Sudharshan TK
 */

import { IPolicy } from '@models/types';
import { objectID } from '@plugins/misc/uid';

const CODE = 'pol';

export const policies_view: Readonly<IPolicy> = {
  _id: objectID(),
  code: `${CODE}view`,
  name: 'View Policies',
  message: 'Enable Viewing Organisation Policies',
  global_flag: true,
};

export const policies_edit: Readonly<IPolicy> = {
  _id: objectID(),
  code: `${CODE}edit`,
  name: 'Edit Policies',
  message: 'Enable Editing of Organisation Policies',
  global_flag: true,
};
