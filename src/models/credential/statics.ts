import { clearCollection } from '@plugins/db/statics';

// Types
import type { Types, Schema } from 'mongoose';
import { ICredentialsDoc, ICredentialsModel } from './types';
import type { IInlineResponse } from '@typs/inline.response';
import type { Error as MongoError } from 'mongoose';

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

/**
 * Appends all the Static Helpers with Schema
 *
 * @param {Schema<ICredentialsDoc, ICredentialsModel>} schema - Model Schema
 * @returns {Schema<ICredentialsDoc, ICredentialsModel>} - Schema with Static Helpers
 */
export default function (
  schema: Schema<ICredentialsDoc, ICredentialsModel>,
): Schema<ICredentialsDoc, ICredentialsModel> {
  schema.statics.clearAll = clearAll;
  schema.statics.checkID = checkID;
  return schema;
}
