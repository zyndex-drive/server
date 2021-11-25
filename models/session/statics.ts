import { clearCollection } from '@plugins/db/statics';

// Types
import type { ISessionDoc, ISessionModel } from './types';
import type { Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Clears the Session Collection by Deleting all the Records
 *
 * @param {ISessionModel} this - Session Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(
  this: ISessionModel,
): Promise<IInlineResponse<string>> {
  return clearCollection<ISessionDoc, ISessionModel>(this);
}

/**
 * Appends all the Static Helpers with Schema
 *
 * @param {Schema<ISessionDoc, ISessionModel>} schema - Model Schema
 * @returns {Schema<ISessionDoc, ISessionModel>} - Schema with Static Helpers
 */
export default function (
  schema: Schema<ISessionDoc, ISessionModel>,
): Schema<ISessionDoc, ISessionModel> {
  schema.statics.clearAll = clearAll;
  return schema;
}
