import { IPolicy, IPolicyDoc, IPolicyModel } from './types';

/**
 * Create a Policy Document and Save it to Database
 *
 * @param {IPolicyModel} this - Policy Model
 * @param {IPolicyDoc} doc - Policy Doc to be Created and Saved
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
