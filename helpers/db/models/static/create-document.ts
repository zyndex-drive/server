import type { Document, Model, Error as MongoError } from 'mongoose';

/**
 * General Function for all the Models to Add a Document to Collection
 *
 * @param {Model} model - Mongoose Model
 * @param {Document} doc - Data to be Saved
 * @returns {Promise<Document>} - Promise of the Document that is saved
 */
export default function createDocument<
  T,
  U extends Document,
  V extends Model<U>
>(model: V, doc: T): Promise<U> {
  return new Promise<U>((resolve, reject) => {
    const newDoc = new model(doc);
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
