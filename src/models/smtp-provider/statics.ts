import { clearCollection } from '@plugins/db/statics';

// Types
import type { ISMTPProviderDoc, ISMTPProviderModel } from './types';
import type { Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Clears the SMTP Provider Collection by Deleting all the Records
 *
 * @param {ISMTPProviderModel} this - SMTP Provider Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(
  this: ISMTPProviderModel,
): Promise<IInlineResponse<string>> {
  return clearCollection<ISMTPProviderDoc, ISMTPProviderModel>(this);
}

/**
 * Appends all the Static Helpers with Schema
 *
 * @param {Schema<ISMTPProviderDoc, ISMTPProviderModel>} schema - Model Schema
 * @returns {Schema<ISMTPProviderDoc, ISMTPProviderModel>} - Schema with Static Helpers
 */
export default function (
  schema: Schema<ISMTPProviderDoc, ISMTPProviderModel>,
): Schema<ISMTPProviderDoc, ISMTPProviderModel> {
  schema.statics.clearAll = clearAll;
  return schema;
}
