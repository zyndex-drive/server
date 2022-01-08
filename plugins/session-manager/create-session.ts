import { objectID } from '@plugins/misc';
import { Sessions } from '@models';
import { generateJWT } from '@plugins/json-web-token';

import type { Request } from 'express';
import type { ISessionDoc, IFrontendDoc, IUserDoc } from '@models/types';
import type { JWTPayload } from 'jose';

/**
 * Generates a Session for a user for a Particular Frontend
 *
 * @param {Request} req - Request Express Object
 * @param {IUserDoc} user - User Document from the Database
 * @param {IFrontendDoc} frontend - Frontend Document from the Database
 * @returns {Promise<ISessionDoc>} - Promise Resolving to Session Document
 */
export default function (
  req: Request,
  user: IUserDoc,
  frontend: IFrontendDoc,
): Promise<ISessionDoc> {
  return new Promise<ISessionDoc>((resolve, reject) => {
    const payload: JWTPayload = {
      ip: req.ip,
      user_id: String(user._id),
      frontend: String(frontend._id),
    };
    generateJWT(user, payload)
      .then((token) => {
        const newId = objectID('s');
        const now = Date.now();
        const expiryPeriod = 30 * 60 * 60 * 1000;
        const expiry = now + expiryPeriod;
        const newSession = new Sessions({
          _id: newId,
          ...payload,
          token_secret: token,
          issued_at: now,
          expires_at: expiry,
        });
        return newSession;
      })
      .then((newSession) => newSession.save())
      .then(resolve)
      .catch((err: string) => {
        reject(new Error(err));
      });
  });
}
