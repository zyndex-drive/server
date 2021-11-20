import {
  createDocument,
  createMultipleDocuments,
  clearCollection,
} from '@plugins/db/statics';

// Types
import type { IUser, IUserDoc, IUserModel } from './types';
import type { Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Create a User Document and Save it to Database
 *
 * @param {IUserModel} this - User Model
 * @param {IUser} doc - User to be Created and Saved
 * @returns {Promise<IUserDoc>} - Promise Returning Saved Document
 */
export function createDoc(this: IUserModel, doc: IUser): Promise<IUserDoc> {
  return createDocument<IUser, IUserDoc, IUserModel>(this, doc);
}

/**
 * Creates Multiple User Documents and Save it to Database
 *
 * @param {IUserModel} this - User Model
 * @param {IUser[]} docs - User Documents to be Created and Saved
 * @returns {Promise<IUserDoc[]>} - Promise Returning Saved Document
 */
export function createMultiDoc(
  this: IUserModel,
  docs: IUser[],
): Promise<IUserDoc[]> {
  return createMultipleDocuments<IUser, IUserDoc, IUserModel>(this, docs);
}

/**
 * Clears the User Collection by Deleting all the Records
 *
 * @param {IUserModel} this - User Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(this: IUserModel): Promise<IInlineResponse<string>> {
  return clearCollection<IUserDoc, IUserModel>(this);
}

/**
 * Appends all the Static Helpers with Schema
 *
 * @param {Schema<IUserDoc, IUserModel>} schema - Model Schema
 * @returns {Schema<IUserDoc, IUserModel>} - Schema with Static Helpers
 */
export default function (
  schema: Schema<IUserDoc, IUserModel>,
): Schema<IUserDoc, IUserModel> {
  schema.statics.createDoc = createDoc;
  schema.statics.createMultiDoc = createMultiDoc;
  schema.statics.clearAll = clearAll;
  return schema;
}
