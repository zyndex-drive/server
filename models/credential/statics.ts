import { createDocument, clearCollection } from '@plugins/db';

// Types
import { Types } from 'mongoose';
import { ICredentials, ICredentialsDoc, ICredentialsModel } from './types';
import type { IInlineResponse } from '@typs/inline.response';
import type { Error as MongoError } from 'mongoose';

/**
 * Create a Credential Document and Save it to Database
 *
 * @param {ICredentialsModel} this - BlacklistedUser Model
 * @param {ICredentials} doc - Credentials Doc to be Created and Saved
 * @returns {Promise<ICredentialsDoc>} - Promise Returning Saved Document
 */
export function createDoc(
  this: ICredentialsModel,
  doc: ICredentials,
): Promise<ICredentialsDoc> {
  return createDocument<ICredentials, ICredentialsDoc, ICredentialsModel>(
    this,
    doc,
  );
}

/**
 * Clears the Credentials Collection by Deleting all the Records
 *
 * @param {ICredentialsModel} this - Credentials Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(
  this: ICredentialsModel,
): Promise<IInlineResponse<string>> {
  return clearCollection<ICredentialsDoc, ICredentialsModel>(this);
}

/**
 * Checks the Credentials Collection for the Given ID
 *
 * @param {ICredentialsModel} this - Credentials Model
 * @param {Types.ObjectId} id - Credential ID String
 * @returns {Promise<boolean>} - Response whether true or false
 */
export function checkID(
  this: ICredentialsModel,
  id: Types.ObjectId,
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    this.findById(id)
      .then((creds: ICredentialsDoc | null) => {
        if (creds) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err: MongoError) => {
        reject(new Error(`${err.name}: ${err.message}`));
      });
  });
}
