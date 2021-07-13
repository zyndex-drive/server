import createDocument from '@helpers/models/static/create-document';
import clearCollection from '@helpers/models/static/clear-collection';

// Types
import { IPolicy, IPolicyDoc, IPolicyModel } from './types';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Create a Policy Document and Save it to Database
 *
 * @param {IPolicyModel} this - Policy Model
 * @param {IPolicy} doc - Policy Doc to be Created and Saved
 * @returns {Promise<IPolicyDoc>} Promise of Policy Doc
 */
export function createDoc(
  this: IPolicyModel,
  doc: IPolicy,
): Promise<IPolicyDoc> {
  return createDocument<IPolicy, IPolicyDoc, IPolicyModel>(this, doc);
}

/**
 * Clears the Policy Collection by Deleting all the Records
 *
 * @param {IPolicyModel} this - Policy Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(this: IPolicyModel): Promise<IInlineResponse<string>> {
  return clearCollection<IPolicyDoc, IPolicyModel>(this);
}
