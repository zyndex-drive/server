import {
  createDocument,
  createMultipleDocuments,
  clearCollection,
} from '@plugins/db/statics';

// Types
import type {
  IGlobalSettings,
  IGlobalSettingsDoc,
  IGlobalSettingsModel,
} from './types';
import type { Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Create a Global Setting's Document and Save it to Database
 *
 * @param {IGlobalSettingsModel} this - Global Setting's Model
 * @param {IGlobalSettings} doc - Global Setting's Doc to be Created and Saved
 * @returns {Promise<IGlobalSettingsDoc>} - Promise Returning Saved Document
 */
export function createDoc(
  this: IGlobalSettingsModel,
  doc: IGlobalSettings,
): Promise<IGlobalSettingsDoc> {
  return createDocument<
    IGlobalSettings,
    IGlobalSettingsDoc,
    IGlobalSettingsModel
  >(this, doc);
}

/**
 * Create Multiple Global Setting Documents and Save it to Database
 *
 * @param {IGlobalSettingsModel} this - Global Settings Model
 * @param {IGlobalSettings[]} docs - Global Settings Doc to be Created and Saved
 * @returns {Promise<IGlobalSettingsDoc>} - Promise Returning Saved Document
 */
export function createMultiDoc(
  this: IGlobalSettingsModel,
  docs: IGlobalSettings[],
): Promise<IGlobalSettingsDoc[]> {
  return createMultipleDocuments<
    IGlobalSettings,
    IGlobalSettingsDoc,
    IGlobalSettingsModel
  >(this, docs);
}

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
  schema.statics.createDoc = createDoc;
  schema.statics.createMultiDoc = createMultiDoc;
  schema.statics.clearAll = clearAll;
  return schema;
}
