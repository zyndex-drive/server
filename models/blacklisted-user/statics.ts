import createDocument from '@helpers/models/static/create-document';
import type {
  IBlacklistedUser,
  IBlacklistedUserDoc,
  IBlacklistedUserModel,
} from './types';

/**
 * Create a Blacklisted User Document and Save it to Database
 *
 * @param {IBlacklistedUserModel} this - BlacklistedUser Model
 * @param {IBlacklistedUser} doc - Policy Doc to be Created and Saved
 * @returns {Promise<IBlacklistedUserDoc>} Promise of Blacklisted User Doc
 */
export function createBlacklistedUser(
  this: IBlacklistedUserModel,
  doc: IBlacklistedUser,
): Promise<IBlacklistedUserDoc> {
  return createDocument<
    IBlacklistedUser,
    IBlacklistedUserDoc,
    IBlacklistedUserModel
  >(this, doc);
}
