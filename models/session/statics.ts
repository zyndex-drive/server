import {
  createDocument,
  createMultipleDocuments,
  clearCollection,
} from '@plugins/db/statics';

// Types
import type { ISession, ISessionDoc, ISessionModel } from './types';
import type { Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Create a Session Document and Save it to Database
 *
 * @param {ISessionModel} this - Session Model
 * @param {ISession} doc - Session to be Created and Saved
 * @returns {Promise<ISessionDoc>} - Promise Returning Saved Document
 */
export function createDoc(
  this: ISessionModel,
  doc: ISession,
): Promise<ISessionDoc> {
  return createDocument<ISession, ISessionDoc, ISessionModel>(this, doc);
}

/**
 * Creates Multiple Session Document and Save it to Database
 *
 * @param {ISessionModel} this - Session Model
 * @param {ISession[]} docs - Session Documents to be Created and Saved
 * @returns {Promise<ISessionDoc>} - Promise Returning Saved Documents
 */
export function createMultiDoc(
  this: ISessionModel,
  docs: ISession[],
): Promise<ISessionDoc[]> {
  return createMultipleDocuments<ISession, ISessionDoc, ISessionModel>(
    this,
    docs,
  );
}

/**
 * Clears the Session Collection by Deleting all the Records
 *
 * @param {ISessionModel} this - Session Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(
  this: ISessionModel,
): Promise<IInlineResponse<string>> {
  return clearCollection<ISessionDoc, ISessionModel>(this);
}

/**
 * Appends all the Static Helpers with Schema
 *
 * @param {Schema<ISessionDoc, ISessionModel>} schema - Model Schema
 * @returns {Schema<ISessionDoc, ISessionModel>} - Schema with Static Helpers
 */
export default function (
  schema: Schema<ISessionDoc, ISessionModel>,
): Schema<ISessionDoc, ISessionModel> {
  schema.statics.createDoc = createDoc;
  schema.statics.createMultiDoc = createMultiDoc;
  schema.statics.clearAll = clearAll;
  return schema;
}
