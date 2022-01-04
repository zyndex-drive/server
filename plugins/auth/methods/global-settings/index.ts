import { GlobalSettings } from '@models';
import { editDatainDatabase } from '@plugins/auth/helpers';
import { globalSettings as globalSettingsPolicies } from '@plugins/templates/policies';

import type {
  IGlobalSettingsDoc,
  IGlobalSettingsModel,
} from '@models/global-setting/types';
import type { IUserDoc } from '@models/user/types';

/**
 * Edit GlobalSettings in the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {IGlobalSettingsDoc} data - Data to be Modified
 * @param {Partial<IGlobalSettingsDoc>} modifiedData - Modified Object
 * @returns {Promise<boolean>} - true/false
 */
function edit(
  admin: IUserDoc,
  data: IGlobalSettingsDoc,
  modifiedData: Partial<IGlobalSettingsDoc>,
): Promise<boolean> {
  const policies = [globalSettingsPolicies.edit];
  return editDatainDatabase<IGlobalSettingsDoc, IGlobalSettingsModel>(
    GlobalSettings,
    data,
    modifiedData,
    admin,
    policies,
  );
}

export default {
  edit,
};
