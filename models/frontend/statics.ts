import { clearCollection } from '@plugins/db/statics';

// Types
import type { IFrontendDoc, IFrontendModel } from './types';
import type { Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Clears the Frontend Collection by Deleting all the Records
 *
 * @param {IFrontendModel} this - Frontend Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(
  this: IFrontendModel,
): Promise<IInlineResponse<string>> {
  return clearCollection<IFrontendDoc, IFrontendModel>(this);
}

/**
 * Get all the Frontend URL's From the Collection
 *
 * @param {IFrontendModel} this - Frontend Model
 * @returns {IFrontendDoc[]} list of frontend Data
 */
export async function getFrontendUrls(
  this: IFrontendModel,
): Promise<IFrontendDoc[]> {
  return this.find({}, '_id domain name');
}

/**
 * Appends all the Static Helpers with Schema
 *
 * @param {Schema<IFrontendDoc, IFrontendModel>} schema - Model Schema
 * @returns {Schema<IFrontendDoc, IFrontendModel>} - Schema with Static Helpers
 */
export default function (
  schema: Schema<IFrontendDoc, IFrontendModel>,
): Schema<IFrontendDoc, IFrontendModel> {
  schema.statics.getFrontendUrls = getFrontendUrls;
  schema.statics.clearAll = clearAll;
  return schema;
}
