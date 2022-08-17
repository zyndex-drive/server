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
  view: Readonly<IPolicy>;
  add?: Readonly<IPolicy>;
  edit: Readonly<IPolicy>;
  remove?: Readonly<IPolicy>;
}

interface IAdditionalPolicyMap {
  view?: Readonly<IPolicy>[];
  add?: Readonly<IPolicy>[];
  edit?: Readonly<IPolicy>[];
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

interface IAuthFuncResult<
  T extends TGenericModelSchema,
  U extends Document,
  V extends LeanDocument<U>,
> {
  view: (admin: IUserDoc, filter?: FilterQuery<U>) => Promise<U[] | V[]>;
  add?: (admin: IUserDoc, data: T) => Promise<IAddDatabaseResult<T, U>>;
  edit: (
    admin: IUserDoc,
    data: U | V,
    modifiedData: UpdateQuery<U>,
  ) => Promise<IEditDatabaseResult>;
  remove?: (admin: IUserDoc, data: U | V) => Promise<IDeleteDatabaseResult>;
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
  private model: W;
  private lean: boolean;
  private restricted: boolean;
  private policyMap: IAuthPolicyMap;
  private additionalPolicies: IAdditionalPolicyMap | undefined;
  private checkFuncsMap: IAuthCheckFuncMap<T, U, V> | undefined;

  /**
   * Class for the purpose of handling Authentication Among Mongoose Models
   *
   * @param {Model} model - Model in the Database
   * @param {boolean} lean - Whether the Query should run in lean mode
   * @param {boolean} restricted - whether is a restricted model for performing certain operations
   * @param {IAuthPolicyMap} policyMap - Policy Map for the Model
   * @param {IAuthCheckFuncMap} checkFuncsMap - Map of Check Functions for each Method
   * @param {IAdditionalPolicyMap} additionalPolicies - Map of Additional Policies
   */
  constructor(
    model: W,
    lean: boolean,
    restricted: boolean,
    policyMap: IAuthPolicyMap,
    checkFuncsMap?: IAuthCheckFuncMap<T, U, V>,
    additionalPolicies?: IAdditionalPolicyMap,
  ) {
    this.model = model;
    this.lean = lean;
    this.restricted = restricted;
    this.policyMap = policyMap;
    this.additionalPolicies = additionalPolicies;
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
  public async viewDatafromDatabase(
    admin: IUserDoc,
    filter?: FilterQuery<U>,
  ): Promise<U[] | V[]> {
    let policies: Readonly<IPolicy>[];
    if (this.additionalPolicies && this.additionalPolicies.view) {
      policies = [...this.additionalPolicies.view, this.policyMap.view];
    } else {
      policies = [this.policyMap.view];
    }
    await checkPolicy(policies, admin);
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
  public async addDatatoDatabase(
    admin: IUserDoc,
    data: T,
  ): Promise<IAddDatabaseResult<T, U>> {
    if (this.policyMap.add) {
      let result: IAddDatabaseResult<T, U> | undefined = undefined;
      const checkResult =
        this.checkFuncsMap && this.checkFuncsMap.add
          ? this.checkFuncsMap.add(data)
          : { check: true };
      if (checkResult.check) {
        let policies: Readonly<IPolicy>[];
        if (this.additionalPolicies && this.additionalPolicies.add) {
          policies = [...this.additionalPolicies.add, this.policyMap.add];
        } else {
          policies = [this.policyMap.add];
        }
        await checkPolicy(policies, admin).catch(() => {
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
  public async editDatainDatabase(
    admin: IUserDoc,
    data: U | V,
    modifiedData: UpdateQuery<U>,
  ): Promise<IEditDatabaseResult> {
    let result: IEditDatabaseResult | undefined = undefined;
    const checkResult =
      this.checkFuncsMap && this.checkFuncsMap.edit
        ? this.checkFuncsMap.edit(data, modifiedData)
        : { check: true };
    if (checkResult.check) {
      let policies: Readonly<IPolicy>[];
      if (this.additionalPolicies && this.additionalPolicies.edit) {
        policies = [...this.additionalPolicies.edit, this.policyMap.edit];
      } else {
        policies = [this.policyMap.edit];
      }
      await checkPolicy(policies, admin).catch(() => {
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
  }

  /**
   * Delete Data from Database of the Particular Model after Verification
   *
   * @async
   * @param {IUserDoc} admin - Admin user Document from Database
   * @param {Document | LeanDocument} data - id of the Docuemnt to Delete
   * @returns {Promise<IDeleteDatabaseResult>} - Returns DeleteDatabaseType
   */
  public async deleteDatafromDatabase(
    admin: IUserDoc,
    data: U | V,
  ): Promise<IDeleteDatabaseResult> {
    if (this.policyMap.remove) {
      let result: IDeleteDatabaseResult | undefined = undefined;
      const checkResult =
        this.checkFuncsMap && this.checkFuncsMap.remove
          ? this.checkFuncsMap.remove(data)
          : { check: true };
      if (checkResult.check) {
        let policies: Readonly<IPolicy>[];
        if (this.additionalPolicies && this.additionalPolicies.remove) {
          policies = [...this.additionalPolicies.remove, this.policyMap.remove];
        } else {
          policies = [this.policyMap.remove];
        }
        await checkPolicy(policies, admin).catch(() => {
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
   * @returns {IAuthFuncResult} - Returns Map of Utility Methods
   */
  public createAllFunctions(): IAuthFuncResult<T, U, V> {
    if (this.restricted) {
      return {
        view: (admin: IUserDoc, filter?: FilterQuery<U>) =>
          this.viewDatafromDatabase(admin, filter),
        edit: (admin: IUserDoc, data: U | V, modifiedData: UpdateQuery<U>) =>
          this.editDatainDatabase(admin, data, modifiedData),
      };
    } else {
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
}
