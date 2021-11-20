import { encryptFields } from '@plugins/db/helpers';
import type { Document, Model, Error as MongoError } from 'mongoose';

/**
 * General Function for all the Models to Add a Document to Collection
 *
 * @param {Model} model - Mongoose Model
 * @param {Document} doc - Data to be Saved
 * @param {string[]} encryptedFields - Fields to Encrypt before Saving
 * @returns {Promise<Document>} - Promise of the Document that is saved
 */
export default function createDocument<
  T,
  U extends Document,
  V extends Model<U>,
>(model: V, doc: T, encryptedFields?: string[]): Promise<U> {
  return new Promise<U>((resolve, reject) => {
    const encryptedDoc = encryptFields<T>(doc, encryptedFields);
    const newDoc = new model(encryptedDoc);
    newDoc
      .save()
      .then((savedDoc: U) => {
        resolve(savedDoc);
      })
      .catch((err: MongoError) => {
        reject(new Error(`${err.name}: ${err.message}`));
      });
  });
}
