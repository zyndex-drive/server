import { Users } from '@models';

import { sessionManager } from '@plugins';
import { errorResponseHandler } from '@plugins/server/responses';
import { UnAuthorized, BadRequest, InternalServerError } from '@plugins/errors';

// Types
import type { Request, Response, NextFunction } from 'express';

/**
 * Checks the Session id and Session Token and Verifies it
 *
 * @param {Request} req - Express Request Object
 * @param {Response} res - Express Response Object
 * @param {NextFunction} next - Express Next Function
 */
export default async function (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const session_id = req.headers['x-session-id'];
    const session_token = req.headers['x-session-token'];
    if (
      session_id &&
      typeof session_id === 'string' &&
      session_token &&
      typeof session_token === 'string'
    ) {
      const sessionBool = await sessionManager.verifySession(
        session_id,
        session_token,
      );
      if (sessionBool.exists) {
        const userDoc = await Users.findOne({ _id: sessionBool.userid }).exec();
        if (userDoc) {
          req.user = userDoc;
          next();
        } else {
          throw new InternalServerError(
            'Unable to Find User Document for the Session',
          );
        }
      } else {
        throw new UnAuthorized('Session Token is Not Authorized');
      }
    } else {
      throw new BadRequest('x-session-id,x-session-token', 'Request.Headers');
    }
  } catch (e) {
    errorResponseHandler(res, e);
  }
}
