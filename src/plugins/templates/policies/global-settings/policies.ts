/**
 * @file Policy Definition File
 * @description Policies Related to Modifying Global Settings of the Server
 * @module - Global Setitngs
 * @author Sudharshan TK
 */

import { IPolicy } from '@models/types';
import { objectID } from '@plugins/misc/uid';

const CODE = 'gblset';

export const global_settings_view: Readonly<IPolicy> = {
  _id: objectID(),
  code: `${CODE}view`,
  name: 'View Global Settings',
  message: 'Enable Viewing Global Settings of the Server',
  global_flag: true,
};

export const global_settings_edit: Readonly<IPolicy> = {
  _id: objectID(),
  code: `${CODE}edit`,
  name: 'Edit Global Settings',
  message: 'Enable Editing of Global Settings of the Server',
  global_flag: true,
};
