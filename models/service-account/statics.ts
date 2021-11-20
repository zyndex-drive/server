import {
  createDocument,
  createMultipleDocuments,
  clearCollection,
} from '@plugins/db/statics';

// Types
import type { IServiceAcc, IServiceAccDoc, IServiceAccModel } from './types';
import type { Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Create a Service Account Document and Save it to Database
 *
 * @param {IServiceAccModel} this - Service Account Model
 * @param {IServiceAcc} doc - Service Account to be Created and Saved
 * @returns {Promise<IServiceAccDoc>} - Promise Returning Saved Document
 */
export function createDoc(
  this: IServiceAccModel,
  doc: IServiceAcc,
): Promise<IServiceAccDoc> {
  return createDocument<IServiceAcc, IServiceAccDoc, IServiceAccModel>(
    this,
    doc,
  );
}

/**
 * Creates Multiple Service Account Document and Save it to Database
 *
 * @param {IServiceAccModel} this - Service Account Model
 * @param {IServiceAcc[]} docs - Service Account Documents to be Created and Saved
 * @returns {Promise<IServiceAccDoc[]>} - Promise Returning Saved Documents
 */
export function createMultiDoc(
  this: IServiceAccModel,
  docs: IServiceAcc[],
): Promise<IServiceAccDoc[]> {
  return createMultipleDocuments<IServiceAcc, IServiceAccDoc, IServiceAccModel>(
    this,
    docs,
  );
}

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
  schema.statics.createDoc = createDoc;
  schema.statics.createMultiDoc = createMultiDoc;
  schema.statics.clearAll = clearAll;
  return schema;
}
