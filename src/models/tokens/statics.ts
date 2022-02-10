import { clearCollection } from '@plugins/db/statics';
// Types
import type { ITokenDoc, ITokenModel } from './types';
import type { Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Clears the Token Collection by Deleting all the Records
 *
 * @param {ITokenModel} this - Token Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(this: ITokenModel): Promise<IInlineResponse<string>> {
  return clearCollection<ITokenDoc, ITokenModel>(this);
}

/**
 * Appends all the Static Helpers with Schema
 *
 * @param {Schema<ITokenDoc, ITokenModel>} schema - Model Schema
 * @returns {Schema<ITokenDoc, ITokenModel>} - Schema with Static Helpers
 */
export default function (
  schema: Schema<ITokenDoc, ITokenModel>,
): Schema<ITokenDoc, ITokenModel> {
  schema.statics.clearAll = clearAll;
  return schema;
}
