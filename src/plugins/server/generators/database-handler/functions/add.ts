import { BadRequest, UnAuthorized } from '@plugins/errors';
import { errorResponseHandler, okResponse } from '@plugins/server/responses';
import { objectID } from '@plugins/misc';

// Type Imports
import type { Request, Response } from 'express';
import type { Document } from 'mongoose';
import type { IUserDoc, TGenericModelSchema } from '@models/types';
import type { IAddDatabaseResult } from '@plugins/auth/helpers/types';
import type { IAddDatabaseResponse } from '@plugins/server/types';

export interface IAddDatabaseHelpers {
  bodyProp: string;
  modelName: string;
}

/**
 * Common Express Handler for all models to Add new Docs to the Database of that model which follows the auth workflow
 *
 * @param {Request} req - Express Request Object
 * @param {Response} res - Express Response Object
 * @param {IAddDatabaseHelpers} helpers - Helpers for the function
 * @param {Function} authFunc - Auth edit function for that model from auth plugin
 */
export async function add<T extends TGenericModelSchema, U extends Document>(
  req: Request,
  res: Response,
  helpers: IAddDatabaseHelpers,
  authFunc: (admin: IUserDoc, data: T) => Promise<IAddDatabaseResult<T, U>>,
): Promise<void> {
  try {
    if (req.user) {
      const user: IUserDoc = req.user;
      if (req.body) {
        const responseData: IAddDatabaseResponse<T, U> = {
          recordsAdded: [],
          totalRecordsAdded: 0,
          recordsNotAdded: [],
          totalRecordsNotAdded: 0,
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const toAdd: Omit<T, '_id'>[] = req.body[helpers.bodyProp];
        const promises = toAdd.map((doc) => {
          const objectid = objectID();
          const docToAdd = {
            _id: objectid,
            ...doc,
          } as T;
          return authFunc(user, docToAdd);
        });
        const promiseResults = await Promise.allSettled(promises);
        promiseResults.forEach((promise) => {
          if (promise.status === 'fulfilled') {
            if (promise.value.added) {
              responseData.recordsAdded.push(promise.value);
              responseData.totalRecordsAdded += 1;
            } else {
              responseData.recordsNotAdded.push(promise.value);
              responseData.totalRecordsNotAdded += 1;
            }
          } else {
            throw new Error(promise.reason);
          }
        });
        okResponse(res, responseData);
      } else {
        throw new BadRequest(
          helpers.bodyProp,
          `Requests.data to be of type ${helpers.modelName}[]`,
        );
      }
    } else {
      throw new UnAuthorized('User Not found in the Request - Unauthorized');
    }
  } catch (e) {
    errorResponseHandler(res, e);
  }
}
