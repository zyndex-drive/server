import {
  createDocument,
  createMultipleDocuments,
  clearCollection,
} from '@plugins/db/statics';
import encryptedFields from './encrypted-fields';

// Types
import type { IToken, ITokenDoc, ITokenModel } from './types';
import type { Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Create a Token Document and Save it to Database
 *
 * @param {ITokenModel} this - Token Model
 * @param {IToken} doc - Token Document to be Created and Saved
 * @returns {Promise<ITokenDoc>} - Promise Returning Saved Document
 */
export function createDoc(this: ITokenModel, doc: IToken): Promise<ITokenDoc> {
  return createDocument<IToken, ITokenDoc, ITokenModel>(
    this,
    doc,
    encryptedFields,
  );
}

/**
 * Creates Multiple Token Documents and Save it to Database
 *
 * @param {ITokenModel} this - Token Model
 * @param {IToken[]} docs - Token Documents to be Created and Saved
 * @returns {Promise<ITokenDoc[]>} - Promise Returning Saved Documents
 */
export function createMultiDoc(
  this: ITokenModel,
  docs: IToken[],
): Promise<ITokenDoc[]> {
  return createMultipleDocuments<IToken, ITokenDoc, ITokenModel>(
    this,
    docs,
    encryptedFields,
  );
}

/**
 * Clears the SMTP Provider Collection by Deleting all the Records
 *
 * @param {ITokenModel} this - SMTP Provider Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(this: ITokenModel): Promise<IInlineResponse<string>> {
  return clearCollection<ITokenDoc, ITokenModel>(this);
}

/**
 * Appends all the Static Helpers with Schema
 *
 * @param {Schema<ITokenDoc, ITokenModel>} schema - Model Schema
 * @returns {Schema<ITokenDoc, ITokenModel>} - Schema with Static Helpers
 */
export default function (
  schema: Schema<ITokenDoc, ITokenModel>,
): Schema<ITokenDoc, ITokenModel> {
  schema.statics.createDoc = createDoc;
  schema.statics.createMultiDoc = createMultiDoc;
  schema.statics.clearAll = clearAll;
  return schema;
}
