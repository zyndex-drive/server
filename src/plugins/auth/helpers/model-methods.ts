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
import { InternalServerError, BaseError } from '@plugins/errors';

interface IAuthPolicyMap {
  view: Readonly<IPolicy>[];
  add?: Readonly<IPolicy>[];
  edit: Readonly<IPolicy>[];
  remove?: Readonly<IPolicy>[];
}

interface IAuthCheckFuncResult {
  check: boolean;
  error?: BaseError;
}

interface IAuthCheckFuncMap<
  T extends TGenericModelSchema,
  U extends Document,
  V extends LeanDocument<U>,
> {
  add?: (data: T) => IAuthCheckFuncResult;
  edit?: (data: U | V, modifiedData: UpdateQuery<U>) => IAuthCheckFuncResult;
  remove?: (data: U | V) => IAuthCheckFuncResult;
}

interface IAuthAllFuncResult<
  T extends TGenericModelSchema,
  U extends Document,
  V extends LeanDocument<U>,
> {
  view: (admin: IUserDoc, filter?: FilterQuery<U>) => Promise<U[] | V[]>;
  add: (admin: IUserDoc, data: T) => Promise<IAddDatabaseResult<T, U>>;
  edit: (
    admin: IUserDoc,
    data: U | V,
    modifiedData: UpdateQuery<U>,
  ) => Promise<IEditDatabaseResult>;
  remove: (admin: IUserDoc, data: U | V) => Promise<IDeleteDatabaseResult>;
}

/**
 * Class for the purpose of handling Authentication Among Mongoose Models
 */
export class AuthModelMethods<
  T extends TGenericModelSchema,
  U extends Document,
  V extends LeanDocument<U>,
  W extends Model<U>,
> {
  model: W;
  lean: boolean;
  policyMap: IAuthPolicyMap;
  checkFuncsMap: IAuthCheckFuncMap<T, U, V>;

  /**
   * Class for the purpose of handling Authentication Among Mongoose Models
   *
   * @param {Model} model - Model in the Database
   * @param {boolean} lean - Whether the Query should run in lean mode
   * @param {IAuthPolicyMap} policyMap - Map of Policies Applicable for the Model
   * @param {IAuthCheckFuncMap} checkFuncsMap - Map of Check Functions for each Method
   */
  constructor(
    model: W,
    lean: boolean,
    policyMap: IAuthPolicyMap,
    checkFuncsMap: IAuthCheckFuncMap<T, U, V>,
  ) {
    this.model = model;
    this.lean = lean;
    this.policyMap = policyMap;
    this.checkFuncsMap = checkFuncsMap;
  }

  /**
   * View Data from Database of the Particular Model after Verifing Policies
   *
   * @async
   * @param {IUserDoc} admin - Admin user Document from Database
   * @param {Object} filter - Query Filter
   * @returns {Promise<Document>} - Returns EditDatabaseType
   */
  async viewDatafromDatabase(
    admin: IUserDoc,
    filter?: FilterQuery<U>,
  ): Promise<U[] | V[]> {
    await checkPolicy(this.policyMap.view, admin);
    const docs = (await this.model
      .find(filter ? filter : {})
      .lean(this.lean)
      .exec()) as U[] | V[];
    return docs;
  }

  /**
   * Add Data into Database of the Particular Model after Verification
   *
   * @async
   * @param {IUserDoc} admin - Admin user Document from Database
   * @param {Object} data - Data to be Added to Database
   * @returns {Promise<Document>} - Saved Document
   */
  async addDatatoDatabase(
    admin: IUserDoc,
    data: T,
  ): Promise<IAddDatabaseResult<T, U>> {
    if (this.policyMap.add && this.checkFuncsMap.add) {
      let result: IAddDatabaseResult<T, U> | undefined = undefined;
      const checkResult = this.checkFuncsMap.add(data);
      if (checkResult.check) {
        await checkPolicy(this.policyMap.add, admin).catch(() => {
          result = { doc: data, added: false };
        });
        if (result === undefined) {
          const newData = new this.model(data);
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
      } else {
        throw checkResult.error;
      }
    } else {
      throw new InternalServerError(
        'Policy Map & Check Function Not Given for Add Function',
      );
    }
  }

  /**
   * Edit Data in Database of the Particular Model after Verification
   *
   * @async
   * @param {IUserDoc} admin - Admin user Document from Database
   * @param {Document | LeanDocument} data - Data Document from the Database
   * @param {Object} modifiedData - Modified Data
   * @returns {Promise<IEditDatabaseResult>} - Returns EditDatabaseType
   */
  async editDatainDatabase(
    admin: IUserDoc,
    data: U | V,
    modifiedData: UpdateQuery<U>,
  ): Promise<IEditDatabaseResult> {
    if (this.checkFuncsMap.edit) {
      let result: IEditDatabaseResult | undefined = undefined;
      const checkResult = this.checkFuncsMap.edit(data, modifiedData);

      if (checkResult.check) {
        await checkPolicy(this.policyMap.edit, admin).catch(() => {
          result = { id: data._id, updated: false };
        });
        if (result === undefined) {
          await this.model
            .updateOne({ _id: data._id }, modifiedData)
            .catch(() => {
              result = { id: data._id, updated: false };
            });
          return { id: data._id, updated: true };
        } else {
          return result;
        }
      } else {
        throw checkResult.error;
      }
    } else {
      throw new InternalServerError(
        'Policy Check Function Not Given for Edit Function',
      );
    }
  }

  /**
   * Delete Data from Database of the Particular Model after Verification
   *
   * @async
   * @param {IUserDoc} admin - Admin user Document from Database
   * @param {Document | LeanDocument} data - id of the Docuemnt to Delete
   * @returns {Promise<IDeleteDatabaseResult>} - Returns DeleteDatabaseType
   */
  async deleteDatafromDatabase(
    admin: IUserDoc,
    data: U | V,
  ): Promise<IDeleteDatabaseResult> {
    if (this.policyMap.remove && this.checkFuncsMap.remove) {
      let result: IDeleteDatabaseResult | undefined = undefined;
      const checkResult = this.checkFuncsMap.remove(data);
      if (checkResult.check) {
        await checkPolicy(this.policyMap.remove, admin).catch(() => {
          result = { id: data._id, deleted: false };
        });
        if (result === undefined) {
          await this.model.deleteOne({ _id: data._id }).catch(() => {
            result = { id: data._id, deleted: false };
          });
          return { id: data._id, deleted: true };
        } else {
          return result;
        }
      } else {
        throw checkResult.error;
      }
    } else {
      throw new InternalServerError(
        'Policy Map & Check Function Not Given for Remove Function',
      );
    }
  }

  /**
   * Function Which Automatically Creates all the Utility Methods for the Model
   *
   * @returns {IAuthAllFuncResult} - Returns Map of Utility Methods
   */
  createAllFunctions(): IAuthAllFuncResult<T, U, V> {
    return {
      view: (admin: IUserDoc, filter?: FilterQuery<U>) =>
        this.viewDatafromDatabase(admin, filter),
      add: (admin: IUserDoc, data: T) => this.addDatatoDatabase(admin, data),
      edit: (admin: IUserDoc, data: U | V, modifiedData: UpdateQuery<U>) =>
        this.editDatainDatabase(admin, data, modifiedData),
      remove: (admin: IUserDoc, data: U | V) =>
        this.deleteDatafromDatabase(admin, data),
    };
  }
}
