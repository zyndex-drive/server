import {
  createDocument,
  createMultipleDocuments,
  clearCollection,
} from '@plugins/db/statics';

// Types
import type { IScope, IScopeDoc, IScopeModel } from './types';
import type { Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Create a Scope Document and Save it to Database
 *
 * @param {IScopeModel} this - Scope Model
 * @param {IScope} doc - Scope Doc to be Created and Saved
 * @returns {Promise<IScopeDoc>} - Promise Returning Saved Document
 */
export function createDoc(this: IScopeModel, doc: IScope): Promise<IScopeDoc> {
  return createDocument<IScope, IScopeDoc, IScopeModel>(this, doc);
}

/**
 * Creates Multiple Scope Document and Saves it to Database
 *
 * @param {IScopeModel} this - Scope Model
 * @param {IScope[]} docs - Scope Docs to be Created and Saved
 * @returns {Promise<IScopeDoc[]>} - Promise Returning Saved Documents
 */
export function createMultiDoc(
  this: IScopeModel,
  docs: IScope[],
): Promise<IScopeDoc[]> {
  return createMultipleDocuments<IScope, IScopeDoc, IScopeModel>(this, docs);
}

/**
 * Clears the Scope Collection by Deleting all the Records
 *
 * @param {IScopeModel} this - Scope Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(this: IScopeModel): Promise<IInlineResponse<string>> {
  return clearCollection<IScopeDoc, IScopeModel>(this);
}

/**
 * Appends all the Static Helpers with Schema
 *
 * @param {Schema<IScopeDoc, IScopeModel>} schema - Model Schema
 * @returns {Schema<IScopeDoc, IScopeModel>} - Schema with Static Helpers
 */
export default function (
  schema: Schema<IScopeDoc, IScopeModel>,
): Schema<IScopeDoc, IScopeModel> {
  schema.statics.createDoc = createDoc;
  schema.statics.createMultiDoc = createMultiDoc;
  schema.statics.clearAll = clearAll;
  return schema;
}
