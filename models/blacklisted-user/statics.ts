import {
  IBlacklistedUser,
  IBlacklistedUserDoc,
  IBlacklistedUserModel,
} from './types';

/**
 * Create a Blacklisted User Document and Save it to Database
 *
 * @param {IBlacklistedUserModel} this - BlacklistedUser Model
 * @param {IBlacklistedUser} doc - Policy Doc to be Created and Saved
 */
export function createBlacklistedUser(
  this: IBlacklistedUserModel,
  doc: IBlacklistedUser,
): Promise<IBlacklistedUserDoc> {
  return new Promise<IBlacklistedUserDoc>((resolve, reject) => {
    const newDoc = new this(doc);
    newDoc
      .save()
      .then((savedDoc) => {
        resolve(savedDoc);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
