import { checkPolicy } from '@plugins/auth/helpers';

import type { IPolicy, IUserDoc } from '@models/types';
import type { Model, Document, UpdateQuery } from 'mongoose';

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
  T,
  U extends Document,
  V extends Model<U>,
>(
  model: V,
  data: T,
  admin: IUserDoc,
  policies: Readonly<IPolicy>[],
): Promise<U> {
  await checkPolicy(policies, admin);
  const newData = new model(data);
  const savedData = await newData.save();
  return savedData;
}

/**
 * Edit Data in Database of the Particular Model after Verification
 *
 * @param {Model} model - Model in the Database
 * @param {Object} data - Data Document from the Database
 * @param {Object} modifiedData - Modified Data
 * @param {IUserDoc} admin - Admin user Document from Database
 * @param {Readonly<IPolicy>[]} policies - Array of Policies Applicable for the Function
 * @returns {Promise<boolean>} - always resolves to true or throws error
 */
export async function editDatainDatabase<
  U extends Document,
  V extends Model<U>,
>(
  model: V,
  data: U,
  modifiedData: UpdateQuery<U>,
  admin: IUserDoc,
  policies: Readonly<IPolicy>[],
): Promise<boolean> {
  await checkPolicy(policies, admin);
  await model.updateOne({ _id: data._id }, modifiedData);
  return true;
}

/**
 * Delete Data from Database of the Particular Model after Verification
 *
 * @async
 * @param {Model} model - Model in the Database
 * @param {Object} data - Data to be Deleted to Database
 * @param {IUserDoc} admin - Admin user Document from Database
 * @param {Readonly<IPolicy>[]} policies - Array of Policies Applicable for the Function
 * @returns {Promise<boolean>} - always resolves to true or throws error
 */
export async function deleteDatafromDatabase<
  U extends Document,
  V extends Model<U>,
>(
  model: V,
  data: U,
  admin: IUserDoc,
  policies: Readonly<IPolicy>[],
): Promise<boolean> {
  await checkPolicy(policies, admin);
  await model.deleteOne({ _id: data._id });
  return true;
}
