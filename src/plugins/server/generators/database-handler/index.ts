import { add, edit, remove } from './functions';

// Type Imports
import type { Request, Response } from 'express';
import type { Document, LeanDocument } from 'mongoose';
import type { IBaseModel, IUserDoc, TGenericModelSchema } from '@models/types';
import type {
  IAddDatabaseHelpers,
  IEditDatabaseHelpers,
  IDeleteDatabaseHelpers,
} from './functions';
import type {
  IAddDatabaseResult,
  IEditDatabaseResult,
  IDeleteDatabaseResult,
} from '@plugins/auth/helpers/types';

/**
 * Express Handlers for Performing Database Functions
 */
export class ExpressDatabaseHandler<
  T extends TGenericModelSchema,
  U extends Document,
  V extends LeanDocument<U>,
> {
  model: IBaseModel<U>;
  lean: boolean;

  /**
   * Express Handlers for Performing Database Functions
   *
   * @param {IBaseModel} model - Mongoose Model Object
   * @param {boolean} lean - Whether the Model should execuete the query in lean mode
   */
  constructor(model: IBaseModel<U>, lean: boolean) {
    this.model = model;
    this.lean = lean;
  }

  /**
   * Common Express Handler for all models to Add new Docs to the Database of that model which follows the auth workflow
   *
   * @param {Request} req - Express Request Object
   * @param {Response} res - Express Response Object
   * @param {IAddDatabaseHelpers} helpers - Helpers for the function
   * @param {Function} authFunc - Auth edit function for that model from auth plugin
   */
  async add(
    req: Request,
    res: Response,
    helpers: IAddDatabaseHelpers,
    authFunc: (admin: IUserDoc, data: T) => Promise<IAddDatabaseResult<T, U>>,
  ): Promise<void> {
    await add(req, res, helpers, authFunc);
  }

  /**
   * Common Express Handler for all models to Modify the Database of that model which follows the auth workflow
   *
   * @param {Request} req - Express Request Object
   * @param {Response} res - Express Response Object
   * @param {IEditDatabaseHelpers} helpers - Helpers for the function
   * @param {Function} authFunc - Auth edit function for that model from auth plugin
   */
  async edit(
    req: Request,
    res: Response,
    helpers: IEditDatabaseHelpers,
    authFunc: (
      admin: IUserDoc,
      data: U | V,
      modifiedData: T,
    ) => Promise<IEditDatabaseResult>,
  ): Promise<void> {
    await edit<T, U, V>(req, res, this.model, this.lean, helpers, authFunc);
  }

  /**
   * Common Express Handler for all models to Delete Documents from Database of that model which follows the auth workflow
   *
   * @param {Request} req - Express Request Object
   * @param {Response} res - Express Response Object
   * @param {IDeleteDatabaseHelpers} helpers - Helpers for the function
   * @param {Function} authFunc - Auth Delete function for that model from auth plugin
   */
  async delete(
    req: Request,
    res: Response,
    helpers: IDeleteDatabaseHelpers,
    authFunc: (admin: IUserDoc, data: U | V) => Promise<IDeleteDatabaseResult>,
  ): Promise<void> {
    await remove<T, U, V>(req, res, this.model, this.lean, helpers, authFunc);
  }
}
