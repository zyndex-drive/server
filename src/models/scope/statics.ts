import { clearCollection } from '@plugins/db/statics';

// Types
import type { IScopeDoc, IScopeModel } from './types';
import type { Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Clears the Scope Collection by Deleting all the Records
 *
 * @param {IScopeModel} this - Scope Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(this: IScopeModel): Promise<IInlineResponse<string>> {
  return clearCollection<IScopeDoc, IScopeModel>(this);
}

/**
 * Appends all the Static Helpers with Schema
 *
 * @param {Schema<IScopeDoc, IScopeModel>} schema - Model Schema
 * @returns {Schema<IScopeDoc, IScopeModel>} - Schema with Static Helpers
 */
export default function (
  schema: Schema<IScopeDoc, IScopeModel>,
): Schema<IScopeDoc, IScopeModel> {
  schema.statics.clearAll = clearAll;
  return schema;
}
