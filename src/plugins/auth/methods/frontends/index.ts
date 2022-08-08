import { Frontends } from '@models';
import {
  viewDatafromDatabase,
  addDatatoDatabase,
  editDatainDatabase,
  deleteDatafromDatabase,
} from '@plugins/auth/helpers';
import { frontends as frontendsPolicies } from '@plugins/templates/policies';

import type {
  IFrontend,
  IFrontendDoc,
  IFrontendLeanDoc,
  IFrontendModel,
  IUserDoc,
} from '@models/types';
import type {
  IAddDatabaseResult,
  IEditDatabaseResult,
  IDeleteDatabaseResult,
} from '@plugins/auth/helpers/types';
import type { FilterQuery } from 'mongoose';

/**
 * View Frontend Docs from the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {FilterQuery<IFrontendDoc>} filter - Filter Object for Frontend Model
 * @returns {Promise<IFrontendDoc[] | IFrontendLeanDoc[]>} - Documents for the Filter Provided
 */
function view(
  admin: IUserDoc,
  filter?: FilterQuery<IFrontendDoc>,
): Promise<IFrontendDoc[] | IFrontendLeanDoc[]> {
  const policies = [frontendsPolicies.view];
  return viewDatafromDatabase<IFrontendDoc, IFrontendLeanDoc, IFrontendModel>(
    Frontends,
    admin,
    true,
    policies,
    filter,
  );
}

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
 * @param {IFrontendDoc | IFrontendLeanDoc} data - Data to be Modified
 * @param {Partial<IFrontendDoc>} modifiedData - Modified Object
 * @returns {Promise<IEditDatabaseResult>} - IEditDatabaseResult
 */
function edit(
  admin: IUserDoc,
  data: IFrontendDoc | IFrontendLeanDoc,
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
 * @param {IFrontendDoc | IFrontendLeanDoc} data - Data to be Deleted
 * @returns {Promise<IDeleteDatabaseResult>} - IDeleteDatabaseResult
 */
function remove(
  admin: IUserDoc,
  data: IFrontendDoc | IFrontendLeanDoc,
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
  view,
  add,
  edit,
  remove,
};
