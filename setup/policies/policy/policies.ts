/**
 * @file Policy Definition File
 * @description Policies Related to Modifying Organisation Policies
 * @module - Global Setitngs
 * @author Sudharshan TK
 */

import { IPolicy } from '@models/policy/types';
import { Types } from 'mongoose';

const objectID = (num: string) => Types.ObjectId(`pol-policy@${num}`);

export const policies_edit: Readonly<IPolicy> = {
  _id: objectID('1'),
  name: 'Edit Policies',
  message: 'Enable Editing of Organisation Policies',
  global_flag: true,
};
