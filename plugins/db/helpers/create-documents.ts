import encryptFields from './encrypt-fields';
import type { Document, Model, Error as MongoError } from 'mongoose';

const encryptDocs = <T>(docs: T[], encryptedFields?: string[]): T[] => {
  const encryptedDocs: T[] = [];
  docs.forEach((doc) => {
    const encryptedDoc = encryptFields<T>(doc, encryptedFields);
    encryptedDocs.push(encryptedDoc);
  });
  return encryptedDocs;
};

/**
 * General Function for all the Models to Add Multiple Document to Collection
 *
 * @param {Model} model - Mongoose Model
 * @param {Document} docs - Array of Documents to Save
 * @param {string[]} encryptedFields - Fields to Encrypt before Saving
 * @returns {Promise<Document>} - Promise of the Document that is saved
 */
export default function <T, U extends Document, V extends Model<U>>(
  model: V,
  docs: T[],
  encryptedFields?: string[],
): Promise<U[]> {
  return new Promise<U[]>((resolve, reject) => {
    const encryptedDocs = encryptDocs<T>(docs, encryptedFields);
    model
      .insertMany(encryptedDocs)
      .then((savedDocs) => {
        resolve(savedDocs);
      })
      .catch((err: MongoError) => {
        reject(new Error(`${err.name}: ${err.message}`));
      });
  });
}
