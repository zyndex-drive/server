import express from 'express';
import { view, add, edit, remove } from './functions';
import { errorResponseHandler } from '@plugins/server/responses';
import { InternalServerError } from '@plugins/errors';

// Type Imports
import type { Request, Response, IRouter, RequestHandler } from 'express';
import type { Document, LeanDocument, FilterQuery } from 'mongoose';
import type { IBaseModel, IUserDoc, TGenericModelSchema } from '@models/types';
import type { IDatabaseHelpers } from './types';
import type {
  IAddDatabaseResult,
  IEditDatabaseResult,
  IDeleteDatabaseResult,
} from '@plugins/auth/helpers/types';

interface IModelAuthFuncs<
  T extends TGenericModelSchema,
  U extends Document,
  V extends LeanDocument<U>,
> {
  view?: (admin: IUserDoc, filter?: FilterQuery<U>) => Promise<U[] | V[]>;
  add?: (admin: IUserDoc, data: T) => Promise<IAddDatabaseResult<T, U>>;
  edit?: (
    admin: IUserDoc,
    data: U | V,
    modifiedData: T,
  ) => Promise<IEditDatabaseResult>;
  remove?: (admin: IUserDoc, data: U | V) => Promise<IDeleteDatabaseResult>;
}

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
  router: IRouter;
  authFuncs: IModelAuthFuncs<T, U, V>;
  databaseHelpers: Omit<IDatabaseHelpers, 'bodyProp'>;

  /**
   * Express Handlers for Performing Database Functions
   *
   * @param {IBaseModel} model - Mongoose Model Object
   * @param {IModelAuthFuncs} modelAuthFuncs - Object Containing all the Auth Functions for the Model
   * @param {IDatabaseHelpers} databaseHelpers - Helpers for the function
   * @param {boolean} lean - Whether the Model should execuete the query in lean mode
   */
  constructor(
    model: IBaseModel<U>,
    modelAuthFuncs: IModelAuthFuncs<T, U, V>,
    databaseHelpers: Omit<IDatabaseHelpers, 'bodyProp'>,
    lean: boolean,
  ) {
    this.model = model;
    this.lean = lean;
    this.router = express.Router();
    this.authFuncs = modelAuthFuncs;
    this.databaseHelpers = databaseHelpers;
  }

  /**
   * Common Express Handler for all models to View Docs from the Database of that model which follows the auth workflow
   *
   * @param {Request} req - Express Request Object
   * @param {Response} res - Express Response Object
   */
  async view(req: Request, res: Response): Promise<void> {
    if (this.authFuncs.view) {
      await view<U, V>(req, res, this.authFuncs.view);
    } else {
      errorResponseHandler(
        res,
        new InternalServerError(
          `View Auth Function for the ${this.databaseHelpers.modelName} Model Not Found in the Object`,
          'Function Not Found',
        ),
      );
    }
  }

  /**
   * Common Express Handler for all models to Add new Docs to the Database of that model which follows the auth workflow
   *
   * @param {Request} req - Express Request Object
   * @param {Response} res - Express Response Object
   */
  async add(req: Request, res: Response): Promise<void> {
    if (this.authFuncs.add) {
      await add(
        req,
        res,
        {
          ...this.databaseHelpers,
          bodyProp: `${this.databaseHelpers.modelName.toLowerCase()}toAdd`,
        },
        this.authFuncs.add,
      );
    } else {
      errorResponseHandler(
        res,
        new InternalServerError(
          `Add Auth Function for the ${this.databaseHelpers.modelName} Model Not Found in the Object`,
          'Function Not Found',
        ),
      );
    }
  }

  /**
   * Common Express Handler for all models to Modify the Database of that model which follows the auth workflow
   *
   * @param {Request} req - Express Request Object
   * @param {Response} res - Express Response Object
   */
  async edit(req: Request, res: Response): Promise<void> {
    if (this.authFuncs.edit) {
      await edit<T, U, V>(
        req,
        res,
        this.model,
        this.lean,
        {
          ...this.databaseHelpers,
          bodyProp: `${this.databaseHelpers.modelName.toLowerCase()}toUpdate`,
        },
        this.authFuncs.edit,
      );
    } else {
      errorResponseHandler(
        res,
        new InternalServerError(
          `Edit Auth Function for the ${this.databaseHelpers.modelName} Model Not Found in the Object`,
          'Function Not Found',
        ),
      );
    }
  }

  /**
   * Common Express Handler for all models to Delete Documents from Database of that model which follows the auth workflow
   *
   * @param {Request} req - Express Request Object
   * @param {Response} res - Express Response Object
   */
  async delete(req: Request, res: Response): Promise<void> {
    if (this.authFuncs.remove) {
      await remove<T, U, V>(
        req,
        res,
        this.model,
        this.lean,
        {
          ...this.databaseHelpers,
          bodyProp: `${this.databaseHelpers.modelName.toLowerCase()}toDelete`,
        },
        this.authFuncs.remove,
      );
    } else {
      errorResponseHandler(
        res,
        new InternalServerError(
          `Delete Auth Function for the ${this.databaseHelpers.modelName} Model Not Found in the Object`,
          'Function Not Found',
        ),
      );
    }
  }

  /**
   * Hosts all the Routes (Add, View, Edit, Delete) for the Model
   *
   * @returns {IRouter} Router Object Containing all the Routes
   */
  hostAllRoutes(): IRouter {
    if (this.authFuncs.view) {
      this.router.post(
        '/get',
        (async (req, res) => await this.view(req, res)) as RequestHandler,
      );
    }

    if (this.authFuncs.add) {
      this.router.post(
        '/add',
        (async (req, res) => await this.add(req, res)) as RequestHandler,
      );
    }

    if (this.authFuncs.edit) {
      this.router.post(
        '/update',
        (async (req, res) => await this.edit(req, res)) as RequestHandler,
      );
    }

    if (this.authFuncs.remove) {
      this.router.delete(
        '/delete',
        (async (req, res) => await this.delete(req, res)) as RequestHandler,
      );
    }

    return this.router;
  }
}
