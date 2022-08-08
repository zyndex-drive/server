import { checkPolicy } from '@plugins/auth/helpers';

import type { TGenericModelSchema, IPolicy, IUserDoc } from '@models/types';
import type {
  Model,
  Document,
  LeanDocument,
  UpdateQuery,
  FilterQuery,
} from 'mongoose';
import type {
  IAddDatabaseResult,
  IEditDatabaseResult,
  IDeleteDatabaseResult,
} from './types';

/**
 * View Data from Database of the Particular Model after Verifing Policies
 *
 * @param {Model} model - Model in the Database
 * @param {IUserDoc} admin - Admin user Document from Database
 * @param {boolean} lean - Whether the Query should run in lean mode
 * @param {Readonly<IPolicy>[]} policies - Array of Policies Applicable for the Function
 * @param {Object} filter - Query Filter
 * @returns {Promise<Document>} - Returns EditDatabaseType
 */
export async function viewDatafromDatabase<
  T extends Document,
  U extends LeanDocument<T>,
  V extends Model<T>,
>(
  model: V,
  admin: IUserDoc,
  lean: boolean,
  policies: Readonly<IPolicy>[],
  filter?: FilterQuery<T>,
): Promise<T[] | U[]> {
  await checkPolicy(policies, admin);
  const docs = (await model
    .find(filter ? filter : {})
    .lean(lean)
    .exec()) as T[] | U[];
  return docs;
}

/**
 * Add Data into Database of the Particular Model after Verification
 *
 * @async
 * @param {Model} model - Model in the Database
 * @param {Object} data - Data to be Added to Database
 * @param {IUserDoc} admin - Admin user Document from Database
 * @param {Readonly<IPolicy>[]} policies - Array of Policies Applicable for the Function
 * @returns {Promise<Document>} - Saved Document
 */
export async function addDatatoDatabase<
  T extends TGenericModelSchema,
  U extends Document,
  V extends Model<U>,
>(
  model: V,
  data: T,
  admin: IUserDoc,
  policies: Readonly<IPolicy>[],
): Promise<IAddDatabaseResult<T, U>> {
  let result: IAddDatabaseResult<T, U> | undefined = undefined;
  await checkPolicy(policies, admin).catch(() => {
    result = { doc: data, added: false };
  });
  if (result === undefined) {
    const newData = new model(data);
    const savedData = await newData
      .save()
      .then((doc: U) => doc)
      .catch(() => {
        result = { doc: data, added: false };
      });
    if (savedData) {
      return { doc: savedData, added: true };
    } else {
      return { doc: data, added: false };
    }
  } else {
    return result;
  }
}

/**
 * Edit Data in Database of the Particular Model after Verification
 *
 * @param {Model} model - Model in the Database
 * @param {Object} id - Data Document from the Database
 * @param {Object} modifiedData - Modified Data
 * @param {IUserDoc} admin - Admin user Document from Database
 * @param {Readonly<IPolicy>[]} policies - Array of Policies Applicable for the Function
 * @returns {Promise<IEditDatabaseResult>} - Returns EditDatabaseType
 */
export async function editDatainDatabase<
  U extends Document,
  V extends Model<U>,
>(
  model: V,
  id: U['_id'],
  modifiedData: UpdateQuery<U>,
  admin: IUserDoc,
  policies: Readonly<IPolicy>[],
): Promise<IEditDatabaseResult> {
  let result: IEditDatabaseResult | undefined = undefined;
  await checkPolicy(policies, admin).catch(() => {
    result = { id, updated: false };
  });
  if (result === undefined) {
    await model.updateOne({ _id: id }, modifiedData).catch(() => {
      result = { id, updated: false };
    });
    return { id, updated: true };
  } else {
    return result;
  }
}

/**
 * Delete Data from Database of the Particular Model after Verification
 *
 * @async
 * @param {Model} model - Model in the Database
 * @param {Object} id - id of the Docuemnt to Delete
 * @param {IUserDoc} admin - Admin user Document from Database
 * @param {Readonly<IPolicy>[]} policies - Array of Policies Applicable for the Function
 * @returns {Promise<IDeleteDatabaseResult>} - Returns DeleteDatabaseType
 */
export async function deleteDatafromDatabase<
  U extends Document,
  V extends Model<U>,
>(
  model: V,
  id: U['_id'],
  admin: IUserDoc,
  policies: Readonly<IPolicy>[],
): Promise<IDeleteDatabaseResult> {
  let result: IDeleteDatabaseResult | undefined = undefined;
  await checkPolicy(policies, admin).catch(() => {
    result = { id, deleted: false };
  });
  if (result === undefined) {
    await model.deleteOne({ _id: id }).catch(() => {
      result = { id, deleted: false };
    });
    return { id, deleted: true };
  } else {
    return result;
  }
}
