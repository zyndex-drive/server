/**
 * @file Policy Definition File
 * @description Policies Related to Modifying Global Settings of the Server
 * @module - Global Setitngs
 * @author Sudharshan TK
 */

import { IPolicy } from '@models/policy/types';
import { Types } from 'mongoose';

const objectID = (num: string) => Types.ObjectId(`pol-sett@${num}`);

export const global_settings_edit: Readonly<IPolicy> = {
  _id: objectID('001'),
  name: 'Edit Global Settings',
  message: 'Enable Editing of Global Settings of the Server',
  global_flag: true,
};
