import createDocument from '@helpers/models/static/create-document';
import clearCollection from '@helpers/models/static/clear-collection';

// Types
import { IRole, IRoleDoc, IRoleModel } from './types';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Create a Role Document and Save it to Database
 *
 * @param {IRoleModel} this - Role Model
 * @param {IRole} doc - Role Doc to be Created and Saved
 * @returns {Promise<IRoleDoc>} - Promise Returning Saved Document
 */
export function createDoc(this: IRoleModel, doc: IRole): Promise<IRoleDoc> {
  return createDocument<IRole, IRoleDoc, IRoleModel>(this, doc);
}

/**
 * Clears the Role Collection by Deleting all the Records
 *
 * @param {IRoleModel} this - Role Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(this: IRoleModel): Promise<IInlineResponse<string>> {
  return clearCollection<IRoleDoc, IRoleModel>(this);
}
