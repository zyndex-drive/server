import { clearCollection } from '@plugins/db/statics';

// Types
import type { IBlacklistedUserDoc, IBlacklistedUserModel } from './types';
import type { Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Clears the Blacklisted User Collection by Deleting all the Records
 *
 * @param {IBlacklistedUserModel} this - Blacklisted User Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(
  this: IBlacklistedUserModel,
): Promise<IInlineResponse<string>> {
  return clearCollection<IBlacklistedUserDoc, IBlacklistedUserModel>(this);
}

/**
 * Appends all the Static Helpers with Schema
 *
 * @param {Schema<IBlacklistedUserDoc, IBlacklistedUserModel>} schema - Model Schema
 * @returns {Schema<IBlacklistedUserDoc, IBlacklistedUserModel>} - Schema with Static Helpers
 */
export default function (
  schema: Schema<IBlacklistedUserDoc, IBlacklistedUserModel>,
): Schema<IBlacklistedUserDoc, IBlacklistedUserModel> {
  schema.statics.clearAll = clearAll;
  return schema;
}
