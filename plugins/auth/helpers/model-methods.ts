import { checkPolicy } from '@plugins/auth/helpers';

import type { IPolicy, IUserDoc } from '@models/types';
import type { Model, Document, UpdateQuery } from 'mongoose';

/**
 * Add Data into Database of the Particular Model after Verification
 *
 * @param {Model} model - Model in the Database
 * @param {Object} data - Data to be Added to Database
 * @param {IUserDoc} admin - Admin user Document from Database
 * @param {Readonly<IPolicy>[]} policies - Array of Policies Applicable for the Function
 */
export function addDatatoDatabase<T, U extends Document, V extends Model<U>>(
  model: V,
  data: T,
  admin: IUserDoc,
  policies: Readonly<IPolicy>[],
): Promise<U> {
  return new Promise<U>((resolve, reject) => {
    checkPolicy(policies, admin)
      .then(() => {
        const newData = new model(data);
        return newData.save();
      })
      .then(resolve)
      .catch((err: string) => {
        reject(new Error(err));
      });
  });
}

/**
 * Edit Data in Database of the Particular Model after Verification
 *
 * @param {Model} model - Model in the Database
 * @param {Object} data - Data Document from the Database
 * @param {Object} modifiedData - Modified Data
 * @param {IUserDoc} admin - Admin user Document from Database
 * @param {Readonly<IPolicy>[]} policies - Array of Policies Applicable for the Function
 */
export function editDatainDatabase<U extends Document, V extends Model<U>>(
  model: V,
  data: U,
  modifiedData: UpdateQuery<U>,
  admin: IUserDoc,
  policies: Readonly<IPolicy>[],
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    checkPolicy(policies, admin)
      .then(() => model.updateOne({ _id: data._id }, modifiedData))
      .then(() => resolve(true))
      .catch((err: string) => {
        reject(new Error(err));
      });
  });
}

/**
 * Delete Data from Database of the Particular Model after Verification
 *
 * @param {Model} model - Model in the Database
 * @param {Object} data - Data to be Deleted to Database
 * @param {IUserDoc} admin - Admin user Document from Database
 * @param {Readonly<IPolicy>[]} policies - Array of Policies Applicable for the Function
 */
export function deleteDatafromDatabase<U extends Document, V extends Model<U>>(
  model: V,
  data: U,
  admin: IUserDoc,
  policies: Readonly<IPolicy>[],
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    checkPolicy(policies, admin)
      .then(() => model.deleteOne({ _id: data._id }))
      .then(() => resolve(true))
      .catch((err: string) => {
        reject(new Error(err));
      });
  });
}
