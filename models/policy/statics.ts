import { IPolicy, IPolicyDoc, IPolicyModel } from './types';

// Types
import type { Error as MongoError } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Create a Policy Document and Save it to Database
 *
 * @param {IPolicyModel} this - Policy Model
 * @param {IPolicy} doc - Policy Doc to be Created and Saved
 */
export function createPolicy(
  this: IPolicyModel,
  doc: IPolicy,
): Promise<IPolicyDoc> {
  return new Promise<IPolicyDoc>((resolve, reject) => {
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

/**
 * Clears the Policy Collection by Deleting all the Records
 *
 * @param {IPolicyModel} this - Policy Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearCollection(
  this: IPolicyModel,
): Promise<IInlineResponse<string>> {
  return new Promise<IInlineResponse<string>>((resolve, reject) => {
    this.deleteMany({})
      .then(() => {
        const response: IInlineResponse<string> = {
          success: true,
          data: 'Successfully Cleared the Collection',
          error: null,
        };
        resolve(response);
      })
      .catch((err: MongoError) => {
        reject(new Error(`${err.name}: ${err.message}`));
      });
  });
}
