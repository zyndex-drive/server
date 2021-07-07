/**
 * @file Policy Definition File
 * @description Policies Related to Modifying Global Settings of the Server
 * @module - Global Setitngs
 * @author Sudharshan TK
 */

import { IPolicy } from '@models/policy/types';

const IDPREFIX = 'globals@';

export const global_settings_edit: Readonly<IPolicy> = {
  _id: `${IDPREFIX}0001`,
  name: 'Edit Global Settings',
  message: 'Enable Editing of Global Settings of the Server',
  global_flag: true,
};
