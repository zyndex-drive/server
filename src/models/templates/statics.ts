import { clearCollection } from '@plugins/db/statics';

// Types
import type { ITemplateDoc, ITemplateModel } from './types';
import type { Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Clears the Template Collection by Deleting all the Records
 *
 * @param {ITemplateModel} this - User Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(
  this: ITemplateModel,
): Promise<IInlineResponse<string>> {
  return clearCollection<ITemplateDoc, ITemplateModel>(this);
}

/**
 * Appends all the Static Helpers with Schema
 *
 * @param {Schema<ITemplateDoc, ITemplateModel>} schema - Model Schema
 * @returns {Schema<ITemplateDoc, ITemplateModel>} - Schema with Static Helpers
 */
export default function (
  schema: Schema<ITemplateDoc, ITemplateModel>,
): Schema<ITemplateDoc, ITemplateModel> {
  schema.statics.clearAll = clearAll;
  return schema;
}
