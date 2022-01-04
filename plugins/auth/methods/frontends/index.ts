import { Frontends } from '@models';
import {
  addDatatoDatabase,
  editDatainDatabase,
  deleteDatafromDatabase,
} from '@plugins/auth/helpers';
import { frontends as frontendsPolicies } from '@plugins/templates/policies';

import type {
  IFrontend,
  IFrontendDoc,
  IFrontendModel,
} from '@models/frontend/types';
import type { IUserDoc } from '@models/user/types';

/**
 * Add Frontends in the Database
 *
 * @param {IUserDoc} admin - Admin user to Perform the Action
 * @param {IFrontend} data - Frontends Data
 * @returns {Promise<IFrontendDoc>} - Frontends Document from the Database
 */
function add(admin: IUserDoc, data: IFrontend): Promise<IFrontendDoc> {
  const policies = [frontendsPolicies.add];
  return addDatatoDatabase<IFrontend, IFrontendDoc, IFrontendModel>(
    Frontends,
    data,
    admin,
    policies,
  );
}

/**
 * Edit Frontends in the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {IFrontendDoc} data - Data to be Modified
 * @param {Partial<IFrontendDoc>} modifiedData - Modified Object
 * @returns {Promise<boolean>} - true/false
 */
function edit(
  admin: IUserDoc,
  data: IFrontendDoc,
  modifiedData: Partial<IFrontendDoc>,
): Promise<boolean> {
  const policies = [frontendsPolicies.edit];
  return editDatainDatabase<IFrontendDoc, IFrontendModel>(
    Frontends,
    data,
    modifiedData,
    admin,
    policies,
  );
}

/**
 * Delete Frontends from the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {IFrontendDoc} data - Data to be Deleted
 * @returns {Promise<boolean>} - true/false
 */
function remove(admin: IUserDoc, data: IFrontendDoc): Promise<boolean> {
  const policies = [frontendsPolicies.remove];
  return deleteDatafromDatabase<IFrontendDoc, IFrontendModel>(
    Frontends,
    data,
    admin,
    policies,
  );
}

export default {
  add,
  edit,
  remove,
};
