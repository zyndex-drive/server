import { BadRequest, UnAuthorized } from '@plugins/errors';
import { errorResponseHandler, okResponse } from '@plugins/server/responses';

// Type Imports
import type { Request, Response } from 'express';
import type { Document, LeanDocument } from 'mongoose';
import type { IBaseModel, IUserDoc, TGenericModelSchema } from '@models/types';
import type { IEditDatabaseResult } from '@plugins/auth/helpers/types';
import type { IEditDatabaseResponse } from '@plugins/server/types';

export interface IEditDatabaseHelpers {
  bodyProp: string;
  modelName: string;
}

/**
 * Common Express Handler for all models to Modify the Database of that model which follows the auth workflow
 *
 * @param {Request} req - Express Request Object
 * @param {Response} res - Express Response Object
 * @param {IBaseModel} model - Mongoose Model Object
 * @param {boolean} lean - Whether the Model should execuete the query in lean mode
 * @param {IEditDatabaseHelpers} helpers - Helpers for the function
 * @param {Function} authFunc - Auth edit function for that model from auth plugin
 */
export async function editDatabaseFunction<
  T extends TGenericModelSchema,
  U extends Document,
  V extends LeanDocument<U>,
>(
  req: Request,
  res: Response,
  model: IBaseModel<U>,
  lean: boolean,
  helpers: IEditDatabaseHelpers,
  authFunc: (
    admin: IUserDoc,
    data: U | V,
    modifiedData: T,
  ) => Promise<IEditDatabaseResult>,
): Promise<void> {
  try {
    if (req.user) {
      const user: IUserDoc = req.user;
      if (req.body) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const toUpdate: T[] = req.body[helpers.bodyProp];
        if (toUpdate && typeof toUpdate === 'object') {
          const ids: U['_id'][] = toUpdate.map((doc) => {
            if (doc._id) {
              return doc._id;
            } else {
              throw new BadRequest(
                helpers.bodyProp,
                `Requests.data to be of type Partial<${helpers.modelName}>[] with mandatory property _id`,
              );
            }
          });
          const responseData: IEditDatabaseResponse = {
            recordsUpdated: [],
            totalRecordsUpdated: 0,
            recordsNotUpdated: [],
            totalRecordsNotUpdated: 0,
          };
          const getDocPromises = ids.map((id) =>
            model
              .findOne({ _id: id })
              .lean(lean)
              .then((doc) => doc)
              .catch(() => {
                responseData.recordsNotUpdated.push({
                  id: String(id),
                  updated: false,
                });
                responseData.totalRecordsNotUpdated += 1;
              }),
          );
          const allPromiseDocs = (await Promise.allSettled(
            getDocPromises,
          )) as PromiseSettledResult<void | U | V | null>[];
          const toUpdateDocs: (U | V)[] = [];
          allPromiseDocs.forEach((promise) => {
            if (promise.status === 'fulfilled') {
              if (promise.value && promise.value !== undefined) {
                toUpdateDocs.push(promise.value);
              }
            }
          });
          const promises = toUpdateDocs.map((currentDoc) => {
            const [modDoc] = toUpdate.filter(
              (toUpdateDoc) =>
                String(toUpdateDoc._id) === String(currentDoc._id),
            );
            return authFunc(user, currentDoc, modDoc);
          });
          const promiseStatus = await Promise.allSettled(promises);
          promiseStatus.forEach((promise) => {
            if (promise.status === 'fulfilled') {
              if (promise.value.updated) {
                responseData.recordsUpdated.push(promise.value);
                responseData.totalRecordsUpdated += 1;
              } else {
                responseData.recordsNotUpdated.push(promise.value);
                responseData.totalRecordsNotUpdated += 1;
              }
            }
          });
          if (responseData.totalRecordsUpdated > 0) {
            okResponse(res, {
              modelUpdated: helpers.modelName,
              ...responseData,
            });
          } else {
            throw new BadRequest(
              helpers.bodyProp,
              `Requests.data to be of type Partial<${helpers.modelName}>[] with mandatory property _id, No Records Updated as no data matched the type`,
            );
          }
        } else {
          throw new BadRequest(
            helpers.bodyProp,
            `Requests.data to be of type Partial<${helpers.modelName}>[] with mandatory property _id`,
          );
        }
      } else {
        throw new BadRequest(
          helpers.bodyProp,
          `Requests.data to be of type Partial<${helpers.modelName}>[] with mandatory property _id`,
        );
      }
    } else {
      throw new UnAuthorized('User Not found in the Request - Unauthorized');
    }
  } catch (e) {
    errorResponseHandler(res, e);
  }
}
