import { clearCollection } from '@plugins/db/statics';

// Types
import type { IUserDoc, IUserModel } from './types';
import type { Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Clears the User Collection by Deleting all the Records
 *
 * @param {IUserModel} this - User Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(this: IUserModel): Promise<IInlineResponse<string>> {
  return clearCollection<IUserDoc, IUserModel>(this);
}

/**
 * Appends all the Static Helpers with Schema
 *
 * @param {Schema<IUserDoc, IUserModel>} schema - Model Schema
 * @returns {Schema<IUserDoc, IUserModel>} - Schema with Static Helpers
 */
export default function (
  schema: Schema<IUserDoc, IUserModel>,
): Schema<IUserDoc, IUserModel> {
  schema.statics.clearAll = clearAll;
  return schema;
}
