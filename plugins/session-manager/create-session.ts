import { objectID } from '@plugins/misc';
import { Sessions, GlobalSettings } from '@models';
import { generateJWT } from '@plugins/json-web-token';

import type { Request } from 'express';
import type { Error as MongoError } from 'mongoose';
import type {
  ISessionDoc,
  IFrontendLeanDoc,
  IUserLeanDoc,
} from '@models/types';
import type { JWTPayload } from 'jose';

/**
 * Generates a Session for a user for a Particular Frontend
 *
 * @param {Request} req - Request Express Object
 * @param {IUserLeanDoc} user - User Document from the Database
 * @param {IFrontendLeanDoc} frontend - Frontend Document from the Database
 * @returns {Promise<ISessionDoc>} - Promise Resolving to Session Document
 */
export default function (
  req: Request,
  user: IUserLeanDoc,
  frontend: IFrontendLeanDoc,
): Promise<ISessionDoc> {
  return new Promise<ISessionDoc>((resolve, reject) => {
    GlobalSettings.findOne({ code: 'max-sessions' })
      .lean()
      .exec()
      .then((maxSessions) => {
        if (maxSessions) {
          const totalSessions = maxSessions.global_flag;
          const payload: JWTPayload = {
            ip: req.ip,
            user_id: String(user._id),
            frontend: String(frontend._id),
          };
          Sessions.find({ user_id: user._id })
            .lean()
            .exec()
            .then((sessionDocs) => {
              if (sessionDocs.length >= totalSessions) {
                Sessions.deleteOne({ user_id: user._id })
                  .then(() => generateJWT(user, payload))
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
              } else {
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
              }
            })
            .catch((err: MongoError) => {
              reject(new Error(`${err.name}: ${err.message}`));
            });
        } else {
          reject(new Error('Max Sessions Flag not Found in the Database'));
        }
      })
      .catch((err: MongoError) => {
        reject(new Error(`${err.name}: ${err.message}`));
      });
  });
}
