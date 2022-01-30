import { objectID } from '@plugins/misc';
import { Sessions, GlobalSettings } from '@models';
import { generateJWT } from '@plugins/json-web-token';

import type { Request } from 'express';
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
export default async function (
  req: Request,
  user: IUserLeanDoc,
  frontend: IFrontendLeanDoc,
): Promise<ISessionDoc> {
  const maxSessions = await GlobalSettings.findOne({ code: 'max-sessions' })
    .lean()
    .exec();
  if (maxSessions) {
    const totalSessions = maxSessions.global_flag;
    const payload: JWTPayload = {
      ip: req.ip,
      user_id: String(user._id),
      frontend: String(frontend._id),
    };
    const sessionDocs = await Sessions.find({ user_id: user._id })
      .lean()
      .exec();
    if (sessionDocs.length >= totalSessions) {
      await Sessions.deleteOne({ user_id: user._id });
      const token = await generateJWT(user, payload);
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
      const sessionDoc = await newSession.save();
      return sessionDoc;
    } else {
      const token = await generateJWT(user, payload);
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
      const sessionDoc = await newSession.save();
      return sessionDoc;
    }
  } else {
    throw new Error('Max Sessions Flag not Found in the Database');
  }
}
