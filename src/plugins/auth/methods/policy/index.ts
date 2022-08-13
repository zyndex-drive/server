import { Policies } from '@models';
import { AuthModelMethods } from '@plugins/auth/helpers';
import { policy as policyPolicies } from '@plugins/templates/policies';

import { NotAllowed } from '@plugins/errors';

import type {
  IPolicy,
  IPolicyDoc,
  IPolicyLeanDoc,
  IPolicyModel,
  IUserDoc,
} from '@models/types';
import type { IEditDatabaseResult } from '@plugins/auth/helpers/types';
import type { FilterQuery, UpdateQuery } from 'mongoose';

const policyMap = {
  view: [policyPolicies.view],
  edit: [policyPolicies.edit],
};

const defaultCheckFunction = () => ({ check: true });

const authCheckFunctions = {
  view: defaultCheckFunction,
  edit: (
    data: IPolicyDoc | IPolicyLeanDoc,
    modifiedData: UpdateQuery<IPolicyDoc>,
  ) => {
    if (modifiedData.code) {
      if (data.code !== modifiedData.code) {
        return {
          check: false,
          error: new NotAllowed(
            'Not Allowed to Edit Code in Global Settings Document',
          ),
        };
      } else {
        return { check: true };
      }
    } else {
      return { check: true };
    }
  },
};

const policyAuthMethods = new AuthModelMethods<
  IPolicy,
  IPolicyDoc,
  IPolicyLeanDoc,
  IPolicyModel
>(Policies, true, policyMap, authCheckFunctions);

export default {
  /**
   * View Policy Docs from the Database
   *
   * @param {IUserDoc} admin - Admin User to Perform the Action
   * @param {FilterQuery<IPolicyDoc>} filter - Filter Object for Policy Model
   * @returns {Promise<IPolicyDoc[] | IPolicyLeanDoc[]>} - Documents for the Filter Provided
   */
  view: (
    admin: IUserDoc,
    filter?: FilterQuery<IPolicyDoc>,
  ): Promise<IPolicyDoc[] | IPolicyLeanDoc[]> =>
    policyAuthMethods.viewDatafromDatabase(admin, filter),

  /**
   * Edit Policies in the Database
   *
   * @param {IUserDoc} admin - Admin User to Perform the Action
   * @param {IPolicyLeanDoc} data - Data to be Modified
   * @param {Partial<IPolicyDoc>} modifiedData - Modified Object
   * @returns {Promise<IEditDatabaseResult>} - IEditDatabaseResult
   */
  edit: (
    admin: IUserDoc,
    data: IPolicyDoc | IPolicyLeanDoc,
    modifiedData: Partial<IPolicyDoc>,
  ): Promise<IEditDatabaseResult> =>
    policyAuthMethods.editDatainDatabase(admin, data, modifiedData),
};
