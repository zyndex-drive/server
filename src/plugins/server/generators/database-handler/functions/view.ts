import { UnAuthorized } from '@plugins/errors';
import { errorResponseHandler, okResponse } from '@plugins/server/responses';

// Type Imports
import type { Request, Response } from 'express';
import type { Document, FilterQuery, LeanDocument } from 'mongoose';
import type { IUserDoc } from '@models/types';

/**
 * Common Express Handler for all models to View Docs from the Database of that model which follows the auth workflow
 *
 * @param {Request} req - Express Request Object
 * @param {Response} res - Express Response Object
 * @param {Function} authFunc - Auth edit function for that model from auth plugin
 */
export async function view<T extends Document, U extends LeanDocument<T>>(
  req: Request,
  res: Response,
  authFunc: (admin: IUserDoc, filter?: FilterQuery<T>) => Promise<T[] | U[]>,
): Promise<void> {
  try {
    if (req.user) {
      const user: IUserDoc = req.user;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const filter: FilterQuery<T> | undefined = req.body['filter'];
      if (filter) {
        const docs = await authFunc(user, filter);
        okResponse(res, docs);
      } else {
        const docs = await authFunc(user);
        okResponse(res, docs);
      }
    } else {
      throw new UnAuthorized('User Not found in the Request - Unauthorized');
    }
  } catch (e) {
    errorResponseHandler(res, e);
  }
}
