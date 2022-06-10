import { isUndefined } from '@plugins/misc';
import { sessionManager } from '@plugins';
import { errorResponseHandler } from '@plugins/server/responses';
import { UnAuthorized, BadRequest } from '@plugins/errors';

// Types
import type { Request, Response, NextFunction } from 'express';

interface ISessionRequestBody {
  session_id: string;
  session_token: string;
}

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
    const { session_id, session_token }: ISessionRequestBody = req.body;
    if (!isUndefined([session_id, session_token])) {
      const sessionBool = await sessionManager.verifySession(
        session_id,
        session_token,
      );
      if (sessionBool) {
        next();
      } else {
        throw new UnAuthorized('Session Token is Not Authorized');
      }
    } else {
      throw new BadRequest('session_id,session_token', 'Request');
    }
  } catch (e) {
    errorResponseHandler(res, e);
  }
}
