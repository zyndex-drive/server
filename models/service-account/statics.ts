import createDocument from '@helpers/models/static/create-document';
import clearCollection from '@helpers/models/static/clear-collection';

// Types
import { IServiceAcc, IServiceAccDoc, IServiceAccModel } from './types';
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
