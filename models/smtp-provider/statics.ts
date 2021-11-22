import {
  createDocument,
  createMultipleDocuments,
  clearCollection,
} from '@plugins/db/statics';
import encryptedFields from './encrypted-fields';

// Types
import type {
  ISMTPProvider,
  ISMTPProviderDoc,
  ISMTPProviderModel,
} from './types';
import type { Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Create a SMTP Provider Document and Save it to Database
 *
 * @param {ISMTPProviderModel} this - SMTP Provider Model
 * @param {ISMTPProvider} doc - SMTP Provider to be Created and Saved
 * @returns {Promise<ISMTPProviderDoc>} - Promise Returning Saved Document
 */
export function createDoc(
  this: ISMTPProviderModel,
  doc: ISMTPProvider,
): Promise<ISMTPProviderDoc> {
  return createDocument<ISMTPProvider, ISMTPProviderDoc, ISMTPProviderModel>(
    this,
    doc,
    encryptedFields,
  );
}

/**
 * Creates Multiple SMTP Provider Document and Save it to Database
 *
 * @param {ISMTPProviderModel} this - SMTP Provider Model
 * @param {ISMTPProvider[]} docs - SMTP Provider Documents to be Created and Saved
 * @returns {Promise<ISMTPProviderDoc[]>} - Promise Returning Saved Documents
 */
export function createMultiDoc(
  this: ISMTPProviderModel,
  docs: ISMTPProvider[],
): Promise<ISMTPProviderDoc[]> {
  return createMultipleDocuments<
    ISMTPProvider,
    ISMTPProviderDoc,
    ISMTPProviderModel
  >(this, docs, encryptedFields);
}

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
  schema.statics.createDoc = createDoc;
  schema.statics.createMultiDoc = createMultiDoc;
  schema.statics.clearAll = clearAll;
  return schema;
}
