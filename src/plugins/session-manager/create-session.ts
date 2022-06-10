import { objectID } from '@plugins/misc';
import { Sessions, GlobalSettings, Frontends } from '@models';
import { generateJWT } from '@plugins/json-web-token';
import { NotFound } from '@plugins/errors';

import type { Request } from 'express';
import type { ISessionDoc, IUserDoc } from '@models/types';
import type { JWTPayload } from 'jose';

interface ISessionResponse {
  _id: string;
  frontend: string;
  ip: string;
  issued_at: number;
  token_secret: string;
  user_id: string;
  roles: { role: string; scope: string }[];
}

const generateResponse = (
  sessionDoc: ISessionDoc,
  userDoc: IUserDoc,
): ISessionResponse => {
  const sessionResponse = {
    _id: String(sessionDoc._id),
    frontend: String(sessionDoc.frontend),
    ip: sessionDoc.ip,
    issued_at: sessionDoc.issued_at,
    token_secret: sessionDoc.token_secret,
    user_id: String(sessionDoc.user_id),
    roles: [
      ...userDoc.roles.map((role) => ({
        role: String(role.role),
        scope: String(role.scope),
      })),
    ],
  };
  return sessionResponse;
};

/**
 * Generates a Session for a user for a Particular Frontend
 *
 * @param {Request} req - Request Express Object
 * @param {IUserDoc} user - User Document from the Database
 * @param {string} frontend - Frontend Document from the Database
 * @returns {Promise<ISessionResponse>} - Promise Resolving to Session Document
 */
export default async function (
  req: Request,
  user: IUserDoc,
  frontend: string,
): Promise<ISessionResponse> {
  const frontendDoc = await Frontends.findOne({ _id: frontend })
    .lean()
    .orFail(() => new NotFound('Frontend ID Not Found in the Database'))
    .exec();
  const maxSessions = await GlobalSettings.findOne({ code: 'max-sessions' })
    .lean()
    .orFail(() => new NotFound('Max Sessions Flag not Found in the Database'))
    .exec();
  const totalSessions = maxSessions.global_flag;
  const payload: JWTPayload = {
    ip: req.clientIp,
    user_id: String(user._id),
    frontend: String(frontendDoc._id),
  };
  const sessionDocs = await Sessions.find({ user_id: user._id }).lean().exec();
  if (sessionDocs.length >= totalSessions) {
    await Sessions.deleteOne({ user_id: user._id });
    const token = await generateJWT(user, payload, 'login');
    const newId = objectID();
    const now = Date.now();
    const newSession = new Sessions({
      _id: newId,
      ...payload,
      token_secret: token,
      issued_at: now,
    });
    const sessionDoc = await newSession.save();
    const response = generateResponse(sessionDoc, user);
    return response;
  } else {
    const token = await generateJWT(user, payload, 'login');
    const newId = objectID();
    const now = Date.now();
    const newSession = new Sessions({
      _id: newId,
      ...payload,
      token_secret: token,
      issued_at: now,
    });
    const sessionDoc = await newSession.save();
    const response = generateResponse(sessionDoc, user);
    return response;
  }
}
