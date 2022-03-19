import { clearCollection } from '@plugins/db/statics';

// Types
import type { IServiceAccDoc, IServiceAccModel } from './types';
import type { Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Clears the Service Account Collection by Deleting all the Records
 *
 * @param {IServiceAccModel} this - Service Account Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(
  this: IServiceAccModel,
): Promise<IInlineResponse<string>> {
  return clearCollection<IServiceAccDoc, IServiceAccModel>(this);
}

/**
 * Appends all the Static Helpers with Schema
 *
 * @param {Schema<IServiceAccDoc, IServiceAccModel>} schema - Model Schema
 * @returns {Schema<IServiceAccDoc, IServiceAccModel>} - Schema with Static Helpers
 */
export default function (
  schema: Schema<IServiceAccDoc, IServiceAccModel>,
): Schema<IServiceAccDoc, IServiceAccModel> {
  schema.statics.clearAll = clearAll;
  return schema;
}
