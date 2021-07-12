import { ICredentials, ICredentialsDoc, ICredentialsModel } from './types';

/**
 * Create a Credential Document and Save it to Database
 *
 * @param {ICredentialsModel} this - BlacklistedUser Model
 * @param {ICredentials} doc - Credentials Doc to be Created and Saved
 */
export function createCredentials(
  this: ICredentialsModel,
  doc: ICredentials,
): Promise<ICredentialsDoc> {
  return new Promise<ICredentialsDoc>((resolve, reject) => {
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
