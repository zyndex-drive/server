import { GlobalSettings } from '@models';
import {
  viewDatafromDatabase,
  editDatainDatabase,
} from '@plugins/auth/helpers';
import { globalSettings as globalSettingsPolicies } from '@plugins/templates/policies';

import type {
  IGlobalSettingsDoc,
  IGlobalSettingsLeanDoc,
  IGlobalSettingsModel,
  IUserDoc,
} from '@models/types';
import type { IEditDatabaseResult } from '@plugins/auth/helpers/types';
import type { FilterQuery } from 'mongoose';

/**
 * View Global Setting Docs from the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {FilterQuery<IGlobalSettingsDoc>} filter - Filter Object for Global Settings Model
 * @returns {Promise<IGlobalSettingsDoc[] | IGlobalSettingsLeanDoc[]>} - Documents for the Filter Provided
 */
function view(
  admin: IUserDoc,
  filter?: FilterQuery<IGlobalSettingsDoc>,
): Promise<IGlobalSettingsDoc[] | IGlobalSettingsLeanDoc[]> {
  const policies = [globalSettingsPolicies.view];
  return viewDatafromDatabase<
    IGlobalSettingsDoc,
    IGlobalSettingsLeanDoc,
    IGlobalSettingsModel
  >(GlobalSettings, admin, true, policies, filter);
}

/**
 * Edit GlobalSettings in the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {IGlobalSettingsDoc | IGlobalSettingsLeanDoc} data - Data to be Modified
 * @param {Partial<IGlobalSettingsDoc>} modifiedData - Modified Object
 * @returns {Promise<IEditDatabaseResult>} - IEditDatabaseResult
 */
function edit(
  admin: IUserDoc,
  data: IGlobalSettingsDoc | IGlobalSettingsLeanDoc,
  modifiedData: Partial<IGlobalSettingsDoc>,
): Promise<IEditDatabaseResult> {
  const policies = [globalSettingsPolicies.edit];
  return editDatainDatabase<IGlobalSettingsDoc, IGlobalSettingsModel>(
    GlobalSettings,
    data._id,
    modifiedData,
    admin,
    policies,
  );
}

export default {
  view,
  edit,
};
