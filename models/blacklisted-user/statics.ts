import {
  createDocument,
  createMultipleDocuments,
  clearCollection,
} from '@plugins/db/statics';

// Types
import type {
  IBlacklistedUser,
  IBlacklistedUserDoc,
  IBlacklistedUserModel,
} from './types';
import type { Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Create a Blacklisted User Document and Save it to Database
 *
 * @param {IBlacklistedUserModel} this - BlacklistedUser Model
 * @param {IBlacklistedUser} doc - Policy Doc to be Created and Saved
 * @returns {Promise<IBlacklistedUserDoc>} Promise of Blacklisted User Doc
 */
export function createDoc(
  this: IBlacklistedUserModel,
  doc: IBlacklistedUser,
): Promise<IBlacklistedUserDoc> {
  return createDocument<
    IBlacklistedUser,
    IBlacklistedUserDoc,
    IBlacklistedUserModel
  >(this, doc);
}

/**
 * Creates Multiple Blacklisted User Documents and Save it to Database
 *
 * @param {IBlacklistedUserModel} this - BlacklistedUser Model
 * @param {IBlacklistedUser} docs - Policy Docs to be Created and Saved
 * @returns {Promise<IBlacklistedUserDoc[]>} Promise of Blacklisted User Docs
 */
export function createMultiDoc(
  this: IBlacklistedUserModel,
  docs: IBlacklistedUser[],
): Promise<IBlacklistedUserDoc[]> {
  return createMultipleDocuments<
    IBlacklistedUser,
    IBlacklistedUserDoc,
    IBlacklistedUserModel
  >(this, docs);
}

/**
 * Clears the Blacklisted User Collection by Deleting all the Records
 *
 * @param {IBlacklistedUserModel} this - Blacklisted User Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(
  this: IBlacklistedUserModel,
): Promise<IInlineResponse<string>> {
  return clearCollection<IBlacklistedUserDoc, IBlacklistedUserModel>(this);
}

/**
 * Appends all the Static Helpers with Schema
 *
 * @param {Schema<IBlacklistedUserDoc, IBlacklistedUserModel>} schema - Model Schema
 * @returns {Schema<IBlacklistedUserDoc, IBlacklistedUserModel>} - Schema with Static Helpers
 */
export default function (
  schema: Schema<IBlacklistedUserDoc, IBlacklistedUserModel>,
): Schema<IBlacklistedUserDoc, IBlacklistedUserModel> {
  schema.statics.createDoc = createDoc;
  schema.statics.createMultiDoc = createMultiDoc;
  schema.statics.clearAll = clearAll;
  return schema;
}
