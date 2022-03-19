import { clearCollection } from '@plugins/db/statics';

// Types
import type { IGlobalSettingsDoc, IGlobalSettingsModel } from './types';
import type { Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Clears the Global Settings Collection by Deleting all the Records
 *
 * @param {IGlobalSettingsModel} this - Global Setting's Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(
  this: IGlobalSettingsModel,
): Promise<IInlineResponse<string>> {
  return clearCollection<IGlobalSettingsDoc, IGlobalSettingsModel>(this);
}

/**
 * Appends all the Static Helpers with Schema
 *
 * @param {Schema<IGlobalSettingsDoc, IGlobalSettingsModel>} schema - Model Schema
 * @returns {Schema<IGlobalSettingsDoc, IGlobalSettingsModel>} - Schema with Static Helpers
 */
export default function (
  schema: Schema<IGlobalSettingsDoc, IGlobalSettingsModel>,
): Schema<IGlobalSettingsDoc, IGlobalSettingsModel> {
  schema.statics.clearAll = clearAll;
  return schema;
}
