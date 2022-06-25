import { GlobalSettings } from '@models';
import { editDatainDatabase } from '@plugins/auth/helpers';
import { globalSettings as globalSettingsPolicies } from '@plugins/templates/policies';

import type {
  IGlobalSettingsDoc,
  IGlobalSettingsModel,
  IUserDoc,
} from '@models/types';
import type { IEditDatabaseResult } from '@plugins/auth/helpers/types';

/**
 * Edit GlobalSettings in the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {IGlobalSettingsDoc} data - Data to be Modified
 * @param {Partial<IGlobalSettingsDoc>} modifiedData - Modified Object
 * @returns {Promise<IEditDatabaseResult>} - IEditDatabaseResult
 */
function edit(
  admin: IUserDoc,
  data: IGlobalSettingsDoc,
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
  edit,
};
