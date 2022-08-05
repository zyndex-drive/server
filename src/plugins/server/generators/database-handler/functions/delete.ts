import { BadRequest, UnAuthorized } from '@plugins/errors';
import { errorResponseHandler, okResponse } from '@plugins/server/responses';

// Type Imports
import type { Request, Response } from 'express';
import type { Document, LeanDocument } from 'mongoose';
import type { IBaseModel, IUserDoc, TGenericModelSchema } from '@models/types';
import type { IDeleteDatabaseResult } from '@plugins/auth/helpers/types';
import type { IDeleteDatabaseResponse } from '@plugins/server/types';

export interface IDeleteDatabaseHelpers {
  bodyProp: string;
  modelName: string;
}

/**
 * Common Express Handler for all models to Delete Documents from Database of that model which follows the auth workflow
 *
 * @param {Request} req - Express Request Object
 * @param {Response} res - Express Response Object
 * @param {IBaseModel} model - Mongoose Model Object
 * @param {boolean} lean - Whether the Model should execuete the query in lean mode
 * @param {IDeleteDatabaseHelpers} helpers - Helpers for the function
 * @param {Function} authFunc - Auth Delete function for that model from auth plugin
 */
export async function remove<
  T extends TGenericModelSchema,
  U extends Document,
  V extends LeanDocument<U>,
>(
  req: Request,
  res: Response,
  model: IBaseModel<U>,
  lean: boolean,
  helpers: IDeleteDatabaseHelpers,
  authFunc: (admin: IUserDoc, data: U | V) => Promise<IDeleteDatabaseResult>,
): Promise<void> {
  try {
    if (req.user) {
      const user: IUserDoc = req.user;
      if (req.body) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const toDelete: T[] = req.body[helpers.bodyProp];
        if (toDelete && typeof toDelete === 'object') {
          const ids: U['_id'][] = toDelete.map((doc) => {
            if (doc._id) {
              return doc._id;
            } else {
              throw new BadRequest(
                helpers.bodyProp,
                `Requests.data to be of type Partial<${helpers.modelName}>['_id'][] with mandatory property _id`,
              );
            }
          });
          const responseData: IDeleteDatabaseResponse = {
            recordsDeleted: [],
            totalRecordsDeleted: 0,
            recordsNotDeleted: [],
            totalRecordsNotDeleted: 0,
          };
          const getDocPromises = ids.map((id) =>
            model
              .findOne({ _id: id })
              .lean(lean)
              .then((doc) => doc)
              .catch(() => {
                responseData.recordsNotDeleted.push({
                  id: String(id),
                  deleted: false,
                });
                responseData.totalRecordsNotDeleted += 1;
              }),
          );
          const allPromiseDocs = (await Promise.allSettled(
            getDocPromises,
          )) as PromiseSettledResult<void | U | V | null>[];
          const toDeleteDocs: (U | V)[] = [];
          allPromiseDocs.forEach((promise) => {
            if (promise.status === 'fulfilled') {
              if (promise.value && promise.value !== undefined) {
                toDeleteDocs.push(promise.value);
              }
            }
          });
          const promises = toDeleteDocs.map((currentDoc) =>
            authFunc(user, currentDoc),
          );
          const promiseStatus = await Promise.allSettled(promises);
          promiseStatus.forEach((promise) => {
            if (promise.status === 'fulfilled') {
              if (promise.value.deleted) {
                responseData.recordsDeleted.push(promise.value);
                responseData.totalRecordsDeleted += 1;
              } else {
                responseData.recordsNotDeleted.push(promise.value);
                responseData.totalRecordsNotDeleted += 1;
              }
            } else {
              throw new Error(promise.reason);
            }
          });
          if (responseData.totalRecordsDeleted > 0) {
            okResponse(res, {
              modelUpdated: helpers.modelName,
              ...responseData,
            });
          } else {
            throw new BadRequest(
              helpers.bodyProp,
              `Requests.data to be of type Partial<${helpers.modelName}>['_id'][] with mandatory property _id, No Records Deleted as no data matched the type`,
            );
          }
        } else {
          throw new BadRequest(
            helpers.bodyProp,
            `Requests.data to be of type Partial<${helpers.modelName}>['_id'][] with mandatory property _id`,
          );
        }
      } else {
        throw new BadRequest(
          helpers.bodyProp,
          `Requests.data to be of type Partial<${helpers.modelName}>['_id'][] with mandatory property _id`,
        );
      }
    } else {
      throw new UnAuthorized('User Not found in the Request - Unauthorized');
    }
  } catch (e) {
    errorResponseHandler(res, e);
  }
}
