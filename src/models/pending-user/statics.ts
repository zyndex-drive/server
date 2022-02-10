import { clearCollection } from '@plugins/db/statics';

// Types
import type { IPendingUserDoc, IPendingUserModel } from './types';
import type { Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Clears the Pending User Collection by Deleting all the Records
 *
 * @param {IPendingUserModel} this - Pending User Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(
  this: IPendingUserModel,
): Promise<IInlineResponse<string>> {
  return clearCollection<IPendingUserDoc, IPendingUserModel>(this);
}

/**
 * Appends all the Static Helpers with Schema
 *
 * @param {Schema<IPendingUserDoc, IPendingUserModel>} schema - Model Schema
 * @returns {Schema<IPendingUserDoc, IPendingUserModel>} - Schema with Static Helpers
 */
export default function (
  schema: Schema<IPendingUserDoc, IPendingUserModel>,
): Schema<IPendingUserDoc, IPendingUserModel> {
  schema.statics.clearAll = clearAll;
  return schema;
}
