import createDocument from '@helpers/models/static/create-document';
import clearCollection from '@helpers/models/static/clear-collection';

// Types
import { IPendingUser, IPendingUserDoc, IPendingUserModel } from './types';
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
