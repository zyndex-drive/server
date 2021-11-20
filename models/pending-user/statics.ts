import {
  createDocument,
  createMultipleDocuments,
  clearCollection,
} from '@plugins/db/statics';

// Types
import type { IPendingUser, IPendingUserDoc, IPendingUserModel } from './types';
import type { Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Create a Pending User Document and Save it to Database
 *
 * @param {IPendingUserModel} this - Pending User Model
 * @param {IPendingUser} doc - Pending User Doc to be Created and Saved
 * @returns {Promise<IPendingUserDoc>} - Promise Returning Saved Document
 */
export function createDoc(
  this: IPendingUserModel,
  doc: IPendingUser,
): Promise<IPendingUserDoc> {
  return createDocument<IPendingUser, IPendingUserDoc, IPendingUserModel>(
    this,
    doc,
  );
}

/**
 * Create Multiple Pending User Document and Saves it to Database
 *
 * @param {IPendingUserModel} this - Pending User Model
 * @param {IPendingUser[]} docs - Pending User Docs to be Created and Saved
 * @returns {Promise<IPendingUserDoc>} - Promise Returning Saved Documents
 */
export function createMultiDoc(
  this: IPendingUserModel,
  docs: IPendingUser[],
): Promise<IPendingUserDoc[]> {
  return createMultipleDocuments<
    IPendingUser,
    IPendingUserDoc,
    IPendingUserModel
  >(this, docs);
}

/**
 * Clears the Pending User Collection by Deleting all the Records
 *
 * @param {IPendingUserModel} this - Pending User Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(
  this: IPendingUserModel,
): Promise<IInlineResponse<string>> {
  return clearCollection<IPendingUserDoc, IPendingUserModel>(this);
}

/**
 * Appends all the Static Helpers with Schema
 *
 * @param {Schema<IPendingUserDoc, IPendingUserModel>} schema - Model Schema
 * @returns {Schema<IPendingUserDoc, IPendingUserModel>} - Schema with Static Helpers
 */
export default function (
  schema: Schema<IPendingUserDoc, IPendingUserModel>,
): Schema<IPendingUserDoc, IPendingUserModel> {
  schema.statics.createDoc = createDoc;
  schema.statics.createMultiDoc = createMultiDoc;
  schema.statics.clearAll = clearAll;
  return schema;
}
