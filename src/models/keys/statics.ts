import { clearCollection } from '@plugins/db/statics';
// Types
import type { IKeyDoc, IKeyModel } from './types';
import type { Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Clears the Keys Collection by Deleting all the Records
 *
 * @param {IKeyModel} this - Token Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(this: IKeyModel): Promise<IInlineResponse<string>> {
  return clearCollection<IKeyDoc, IKeyModel>(this);
}

/**
 * Appends all the Static Helpers with Schema
 *
 * @param {Schema<IKeyDoc, IKeyModel>} schema - Model Schema
 * @returns {Schema<IKeyDoc, IKeyModel>} - Schema with Static Helpers
 */
export default function (
  schema: Schema<IKeyDoc, IKeyModel>,
): Schema<IKeyDoc, IKeyModel> {
  schema.statics.clearAll = clearAll;
  return schema;
}
