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
  IUserDoc,
} from '@models/types';
import type {
  IAddDatabaseResult,
  IEditDatabaseResult,
  IDeleteDatabaseResult,
} from '@plugins/auth/helpers/types';

/**
 * Add Frontends in the Database
 *
 * @param {IUserDoc} admin - Admin user to Perform the Action
 * @param {IFrontend} data - Frontends Data
 * @returns {Promise<IAddDatabaseResult<IFrontend, IFrontendDoc>>} - Frontends Document from the Database
 */
function add(
  admin: IUserDoc,
  data: IFrontend,
): Promise<IAddDatabaseResult<IFrontend, IFrontendDoc>> {
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
 * @returns {Promise<IEditDatabaseResult>} - IEditDatabaseResult
 */
function edit(
  admin: IUserDoc,
  data: IFrontendDoc,
  modifiedData: Partial<IFrontendDoc>,
): Promise<IEditDatabaseResult> {
  const policies = [frontendsPolicies.edit];
  return editDatainDatabase<IFrontendDoc, IFrontendModel>(
    Frontends,
    data._id,
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
 * @returns {Promise<IDeleteDatabaseResult>} - IDeleteDatabaseResult
 */
function remove(
  admin: IUserDoc,
  data: IFrontendDoc,
): Promise<IDeleteDatabaseResult> {
  const policies = [frontendsPolicies.remove];
  return deleteDatafromDatabase<IFrontendDoc, IFrontendModel>(
    Frontends,
    data._id,
    admin,
    policies,
  );
}

export default {
  add,
  edit,
  remove,
};
