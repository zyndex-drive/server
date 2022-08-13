import { GlobalSettings } from '@models';
import { AuthModelMethods } from '@plugins/auth/helpers';
import { globalSettings as globalSettingsPolicies } from '@plugins/templates/policies';
import { NotAllowed } from '@plugins/errors';

import type {
  IGlobalSettings,
  IGlobalSettingsDoc,
  IGlobalSettingsLeanDoc,
  IGlobalSettingsModel,
  IUserDoc,
} from '@models/types';
import type { IEditDatabaseResult } from '@plugins/auth/helpers/types';
import type { FilterQuery, UpdateQuery } from 'mongoose';

const policyMap = {
  view: [globalSettingsPolicies.view],
  edit: [globalSettingsPolicies.edit],
};

const defaultCheckFunction = () => ({ check: true });

const authCheckFunctions = {
  view: defaultCheckFunction,
  edit: (
    data: IGlobalSettingsDoc | IGlobalSettingsLeanDoc,
    modifiedData: UpdateQuery<IGlobalSettingsDoc>,
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

const globalSettingsAuthMethods = new AuthModelMethods<
  IGlobalSettings,
  IGlobalSettingsDoc,
  IGlobalSettingsLeanDoc,
  IGlobalSettingsModel
>(GlobalSettings, true, policyMap, authCheckFunctions);

export default {
  /**
   * View Global Setting Docs from the Database
   *
   * @param {IUserDoc} admin - Admin User to Perform the Action
   * @param {FilterQuery<IGlobalSettingsDoc>} filter - Filter Object for Global Settings Model
   * @returns {Promise<IGlobalSettingsDoc[] | IGlobalSettingsLeanDoc[]>} - Documents for the Filter Provided
   */
  view: (
    admin: IUserDoc,
    filter?: FilterQuery<IGlobalSettingsDoc>,
  ): Promise<IGlobalSettingsDoc[] | IGlobalSettingsLeanDoc[]> =>
    globalSettingsAuthMethods.viewDatafromDatabase(admin, filter),

  /**
   * Edit GlobalSettings in the Database
   *
   * @param {IUserDoc} admin - Admin User to Perform the Action
   * @param {IGlobalSettingsDoc | IGlobalSettingsLeanDoc} data - Data to be Modified
   * @param {Partial<IGlobalSettingsDoc>} modifiedData - Modified Object
   * @returns {Promise<IEditDatabaseResult>} - IEditDatabaseResult
   */
  edit: (
    admin: IUserDoc,
    data: IGlobalSettingsDoc | IGlobalSettingsLeanDoc,
    modifiedData: Partial<IGlobalSettingsDoc>,
  ): Promise<IEditDatabaseResult> =>
    globalSettingsAuthMethods.editDatainDatabase(admin, data, modifiedData),
};
