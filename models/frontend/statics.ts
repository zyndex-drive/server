import {
  createDocument,
  createMultipleDocuments,
  clearCollection,
} from '@plugins/db/statics';

// Types
import type { IFrontend, IFrontendDoc, IFrontendModel } from './types';
import type { Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Create a Frontend Document and Save it to Database
 *
 * @param {IFrontendModel} this - Frontend Model
 * @param {IFrontend} doc - Frontend Doc to be Created and Saved
 * @returns {Promise<IFrontendDoc>} - Promise Returning Saved Document
 */
export function createDoc(
  this: IFrontendModel,
  doc: IFrontend,
): Promise<IFrontendDoc> {
  return createDocument<IFrontend, IFrontendDoc, IFrontendModel>(this, doc);
}

/**
 * Creates Multiple Frontend Document and Saves it to Database
 *
 * @param {IFrontendModel} this - Frontend Model
 * @param {IFrontend[]} docs - Frontend Docs to be Created and Saved
 * @returns {Promise<IFrontendDoc[]>} - Promise Returning Saved Documents
 */
export function createMultiDoc(
  this: IFrontendModel,
  docs: IFrontend[],
): Promise<IFrontendDoc[]> {
  return createMultipleDocuments<IFrontend, IFrontendDoc, IFrontendModel>(
    this,
    docs,
  );
}

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
  schema.statics.createDoc = createDoc;
  schema.statics.createMultiDoc = createMultiDoc;
  schema.statics.clearAll = clearAll;
  return schema;
}
