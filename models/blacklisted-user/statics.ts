import { createDocument, clearCollection } from '@plugins/db';

// Types
import type {
  IBlacklistedUser,
  IBlacklistedUserDoc,
  IBlacklistedUserModel,
} from './types';
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
