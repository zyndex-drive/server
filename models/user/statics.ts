import createDocument from '@/helpers/db/models/static/create-document';
import clearCollection from '@/helpers/db/models/static/clear-collection';

// Types
import type { IUser, IUserDoc, IUserModel } from './types';
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
 * Clears the User Collection by Deleting all the Records
 *
 * @param {IUserModel} this - User Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(this: IUserModel): Promise<IInlineResponse<string>> {
  return clearCollection<IUserDoc, IUserModel>(this);
}
