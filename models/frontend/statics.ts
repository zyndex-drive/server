import createDocument from '@/helpers/db/models/static/create-document';
import clearCollection from '@/helpers/db/models/static/clear-collection';

// Types
import { IFrontend, IFrontendDoc, IFrontendModel } from './types';
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
