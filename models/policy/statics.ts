import {
  createDocument,
  createMultipleDocuments,
  clearCollection,
} from '@plugins/db/statics';

import { map as policyMap } from '@plugins/templates/policies';

// Types
import type { IPolicy, IPolicyDoc, IPolicyModel } from './types';
import type { Error as MongoError, Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Create a Policy Document and Save it to Database
 *
 * @param {IPolicyModel} this - Policy Model
 * @param {IPolicy} doc - Policy Doc to be Created and Saved
 * @returns {Promise<IPolicyDoc>} Promise of Policy Doc
 */
export function createDoc(
  this: IPolicyModel,
  doc: IPolicy,
): Promise<IPolicyDoc> {
  return createDocument<IPolicy, IPolicyDoc, IPolicyModel>(this, doc);
}

/**
 * Create Multiple Policy Document and Save it to Database
 *
 * @param {IPolicyModel} this - Policy Model
 * @param {IPolicy[]} docs - Policy Docs to be Created and Saved
 * @returns {Promise<IPolicyDoc[]>} Promise of Policy Docs
 */
export function createMultiDoc(
  this: IPolicyModel,
  docs: IPolicy[],
): Promise<IPolicyDoc[]> {
  return createMultipleDocuments<IPolicy, IPolicyDoc, IPolicyModel>(this, docs);
}

/**
 * Clears the Policy Collection by Deleting all the Records
 *
 * @param {IPolicyModel} this - Policy Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(this: IPolicyModel): Promise<IInlineResponse<string>> {
  return clearCollection<IPolicyDoc, IPolicyModel>(this);
}

/**
 * Checks the Predefined map of Policies with the Docs present in Database
 *
 * @param {IPolicyModel} this - Policy Model
 * @returns {Promise<IInlineResponse<boolean>>} - Response whether map is matching or not
 */
export function mapCheck(
  this: IPolicyModel,
): Promise<IInlineResponse<boolean>> {
  return new Promise<IInlineResponse<boolean>>((resolve, reject) => {
    const result: IInlineResponse<boolean> = {
      success: false,
      data: false,
      error: null,
    };
    this.find({})
      .then((docs) => {
        const policyMatches: boolean[] = [];
        result.success = true;
        for (let i = 0; i < policyMap.length; i++) {
          const map = policyMap[i];
          const [doc] = docs.filter((doc) => doc._id === map._id);
          if (doc && map && doc._id === map._id) {
            const name = doc.name === map.name;
            const message = doc.message === map.message;
            policyMatches.push(name && message);
          } else {
            policyMatches.push(false);
          }
        }
        if (policyMatches.includes(false)) {
          result.data = false;
        } else {
          result.data = true;
        }
        resolve(result);
      })
      .catch((err: MongoError) => {
        result.error = err;
        reject(new Error(`${err.name}: ${err.message}`));
      });
  });
}

/**
 * Appends all the Static Helpers with Schema
 *
 * @param {Schema<IPolicyDoc, IPolicyModel>} schema - Model Schema
 * @returns {Schema<IPolicyDoc, IPolicyModel>} - Schema with Static Helpers
 */
export default function (
  schema: Schema<IPolicyDoc, IPolicyModel>,
): Schema<IPolicyDoc, IPolicyModel> {
  schema.statics.createDoc = createDoc;
  schema.statics.createMultiDoc = createMultiDoc;
  schema.statics.clearAll = clearAll;
  schema.statics.mapCheck = mapCheck;
  return schema;
}
