import { Policies } from '@models';

import type { IPolicy, IPolicyLeanDoc } from '@models/types';

/**
 * Retreive Policy Documents from Database
 *
 * @async
 * @param {IPolicy[]} policies - Array of Policies to Retrieve
 * @returns {IPolicyLeanDoc[]} - Array of Policy Documents
 */
export async function retrievePolicies(
  policies: IPolicy[],
): Promise<IPolicyLeanDoc[]> {
  const policyCodes = policies.map((policy) => ({ code: policy.code }));
  const policyDocs = await Policies.find({ $or: policyCodes }).lean().exec();
  return policyDocs;
}
