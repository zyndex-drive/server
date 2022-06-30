import { Policies } from '@models';
import { editDatainDatabase } from '@plugins/auth/helpers';
import { policy as policyPolicies } from '@plugins/templates/policies';

import { NotAllowed } from '@plugins/errors';

import type {
  IPolicyDoc,
  IPolicyLeanDoc,
  IPolicyModel,
  IUserDoc,
} from '@models/types';
import type { IEditDatabaseResult } from '@plugins/auth/helpers/types';

/**
 * Edit Policies in the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {IPolicyLeanDoc} data - Data to be Modified
 * @param {Partial<IPolicyDoc>} modifiedData - Modified Object
 * @returns {Promise<IEditDatabaseResult>} - IEditDatabaseResult
 */
function edit(
  admin: IUserDoc,
  data: IPolicyDoc | IPolicyLeanDoc,
  modifiedData: Partial<IPolicyDoc>,
): Promise<IEditDatabaseResult> {
  const policies = [policyPolicies.edit];
  const { code, ...otherData } = modifiedData;
  if (data.code === code || code === undefined) {
    return editDatainDatabase<IPolicyDoc, IPolicyModel>(
      Policies,
      data._id,
      { $set: otherData },
      admin,
      policies,
    );
  } else {
    throw new NotAllowed(
      'Not Allowed to edit code property in policy document',
    );
  }
}

export default {
  edit,
};
