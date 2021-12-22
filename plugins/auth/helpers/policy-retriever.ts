import { Policies } from '@models';

import type { Error as MongoError } from 'mongoose';
import type { IPolicy, IPolicyDoc } from '@models/policy/types';

/**
 * Retreive Policy Documents from Database
 *
 * @param {IPolicy[]} policies - Array of Policies to Retrieve
 * @returns {IPolicyDoc[]} - Array of Policy Documents
 */
export function retrievePolicies(policies: IPolicy[]): Promise<IPolicyDoc[]> {
  return new Promise<IPolicyDoc[]>((resolve, reject) => {
    const policyCodes = policies.map((policy) => ({ code: policy.code }));
    Policies.find({ $or: policyCodes })
      .then(resolve)
      .catch((err: MongoError) => {
        reject(new Error(`${err.name}: ${err.message}`));
      });
  });
}
