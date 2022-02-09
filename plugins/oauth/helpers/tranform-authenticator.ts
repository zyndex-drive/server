import passport from 'passport';
import { encrypt, decrypt } from '@plugins/crypto';
import { errorResponseHandler } from '@plugins/server/responses';

import type { IUserDoc } from '@models/types';
import type { AuthenticateOptions } from 'passport';
import type { Request, Response, NextFunction } from 'express';

type authenticatorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

interface ExpressObjects {
  req: Request;
  res: Response;
  next: NextFunction;
}

interface AuthenticatorOpts {
  strgy: string;
  opts: AuthenticateOptions;
}

/**
 * Converts Passport Authenticate Function into a Proper Express Middleware with Error Handling
 *
 * @param {ExpressObjects} expressObjects - Express Request, Response & Next
 * @param {AuthenticatorOpts} authenticatorOpts - Passport Authenticate Options
 * @param {string} state - State to be Passed to the Middleware
 * @returns {authenticatorMiddleware} - Passport Express Middleware
 */
export function passportAuthenticate(
  expressObjects: ExpressObjects,
  authenticatorOpts: AuthenticatorOpts,
  state: Request['query']['state'],
): authenticatorMiddleware {
  const toEncrypt = state ? String(state) : 'default';
  const encryptedState = encodeURIComponent(encrypt.aes.str(toEncrypt));
  const authenticator: authenticatorMiddleware = passport.authenticate(
    authenticatorOpts.strgy,
    { ...authenticatorOpts.opts, state: encryptedState },
    (error: unknown | null, user: IUserDoc) => {
      try {
        if (error) {
          errorResponseHandler(expressObjects.res, error);
        } else {
          const encryptedQueryState = expressObjects.req.query['state'];
          if (encryptedQueryState) {
            expressObjects.res.locals.state = decrypt.aes.str(
              decodeURIComponent(String(encryptedQueryState)),
            );
            expressObjects.req.user = user;
            expressObjects.next();
          } else {
            errorResponseHandler(
              expressObjects.res,
              new Error('State not Found in the URI'),
            );
          }
        }
      } catch (e) {
        errorResponseHandler(expressObjects.res, e);
      }
    },
  );
  return authenticator;
}
