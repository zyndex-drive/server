import { isUndefined } from '@plugins/misc';
import { sessionManager } from '@plugins';
import { unAuthorized } from '@plugins/server/responses/4XX-response';

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
export default function (
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { session_id, session_token }: ISessionRequestBody = req.body;
  if (!isUndefined([session_id, session_token])) {
    sessionManager
      .verifySession(session_id, session_token)
      .then((sessionBool) => {
        if (sessionBool) {
          next();
        } else {
          unAuthorized(res, 'Session Token is Not Authorized');
        }
      })
      .catch((err: string) => {
        unAuthorized(res, err);
      });
  }
}
