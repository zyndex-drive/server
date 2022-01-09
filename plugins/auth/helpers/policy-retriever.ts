import { Policies } from '@models';

import type { Error as MongoError } from 'mongoose';
import type { IPolicy, IPolicyLeanDoc } from '@models/types';

/**
 * Retreive Policy Documents from Database
 *
 * @param {IPolicy[]} policies - Array of Policies to Retrieve
 * @returns {IPolicyLeanDoc[]} - Array of Policy Documents
 */
export function retrievePolicies(
  policies: IPolicy[],
): Promise<IPolicyLeanDoc[]> {
  return new Promise<IPolicyLeanDoc[]>((resolve, reject) => {
    const policyCodes = policies.map((policy) => ({ code: policy.code }));
    Policies.find({ $or: policyCodes })
      .lean()
      .exec()
      .then(resolve)
      .catch((err: MongoError) => {
        reject(new Error(`${err.name}: ${err.message}`));
      });
  });
}
