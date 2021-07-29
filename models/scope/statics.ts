import createDocument from '@/helpers/db/models/static/create-document';
import clearCollection from '@/helpers/db/models/static/clear-collection';

// Types
import { IScope, IScopeDoc, IScopeModel } from './types';
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
 * Clears the Scope Collection by Deleting all the Records
 *
 * @param {IScopeModel} this - Scope Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(this: IScopeModel): Promise<IInlineResponse<string>> {
  return clearCollection<IScopeDoc, IScopeModel>(this);
}
