import { Policies } from '@models';
import { editDatainDatabase } from '@plugins/auth/helpers';
import { policy as policyPolicies } from '@plugins/templates/policies';

import type { IPolicyDoc, IPolicyModel } from '@models/policy/types';
import type { IUserDoc } from '@models/user/types';

/**
 * Edit Policies in the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {IPolicyDoc} data - Data to be Modified
 * @param {Partial<IPolicyDoc>} modifiedData - Modified Object
 * @returns {Promise<boolean>} - true/false
 */
function edit(
  admin: IUserDoc,
  data: IPolicyDoc,
  modifiedData: Partial<IPolicyDoc>,
): Promise<boolean> {
  const policies = [policyPolicies.edit];
  return editDatainDatabase<IPolicyDoc, IPolicyModel>(
    Policies,
    data,
    modifiedData,
    admin,
    policies,
  );
}

export default {
  edit,
};
