import { Templates } from '@models';
import {
  addDatatoDatabase,
  editDatainDatabase,
  deleteDatafromDatabase,
} from '@plugins/auth/helpers';
import { templates as templatesPolicies } from '@plugins/templates/policies';

import type {
  ITemplate,
  ITemplateDoc,
  ITemplateModel,
  IUserDoc,
} from '@models/types';
import type {
  IAddDatabaseResult,
  IEditDatabaseResult,
  IDeleteDatabaseResult,
} from '@plugins/auth/helpers/types';

/**
 * Add Templates in the Database
 *
 * @param {IUserDoc} admin - Admin user to Perform the Action
 * @param {ITemplate} data - Templates Data
 * @returns {Promise<IAddDatabaseResult<ITemplate, ITemplateDoc>>} - Templates Document from the Database
 */
function add(
  admin: IUserDoc,
  data: ITemplate,
): Promise<IAddDatabaseResult<ITemplate, ITemplateDoc>> {
  const policies = [templatesPolicies.add];
  return addDatatoDatabase<ITemplate, ITemplateDoc, ITemplateModel>(
    Templates,
    data,
    admin,
    policies,
  );
}

/**
 * Edit Templates in the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {ITemplateDoc} data - Data to be Modified
 * @param {Partial<ITemplateDoc>} modifiedData - Modified Object
 * @returns {Promise<IEditDatabaseResult>} - IEditDatabaseResult
 */
function edit(
  admin: IUserDoc,
  data: ITemplateDoc,
  modifiedData: Partial<ITemplateDoc>,
): Promise<IEditDatabaseResult> {
  const policies = [templatesPolicies.edit];
  return editDatainDatabase<ITemplateDoc, ITemplateModel>(
    Templates,
    data._id,
    modifiedData,
    admin,
    policies,
  );
}

/**
 * Delete Templates from the Database
 *
 * @param {IUserDoc} admin - Admin User to Perform the Action
 * @param {ITemplateDoc} data - Data to be Deleted
 * @returns {Promise<IDeleteDatabaseResult>} - IDeleteDatabaseResult
 */
function remove(
  admin: IUserDoc,
  data: ITemplateDoc,
): Promise<IDeleteDatabaseResult> {
  const policies = [templatesPolicies.remove];
  return deleteDatafromDatabase<ITemplateDoc, ITemplateModel>(
    Templates,
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
