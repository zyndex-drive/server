import { Keys, GlobalSettings } from '@models';
import { EncryptJWT, importJWK } from 'jose';

// Error Classes
import { InternalServerError } from '@plugins/errors';

import type { IUserLeanDoc } from '@models/types';
import type { JWTPayload } from 'jose';

/**
 * Generates a JWT using Private Key for a Particular User
 *
 * @param {IUserLeanDoc} user - User Document from Database
 * @param {Object} payload - Payload to Sign and Encrypt
 * @param {string} type - Type of Token to Generate (Login or other)
 * @returns {Promise<string>} - Promise Resolving to JWT
 */
export default async function (
  user: IUserLeanDoc,
  payload: JWTPayload,
  type: 'login' | 'other',
): Promise<string> {
  const secretKey = await Keys.findOne({ type: 'secretkey' });
  if (secretKey) {
    const getExpiryDocPromise = GlobalSettings.findOne({
      code: type === 'login' ? 'login-token-exp' : 'other-token-exp',
    }).lean();
    const getServerUsernameDocPromise = GlobalSettings.findOne({
      code: 'srvr-usr-name',
    }).lean();
    const [getExpiryDoc, getServerUsernameDoc] = await Promise.all([
      getExpiryDocPromise.exec(),
      getServerUsernameDocPromise.exec(),
    ]);
    if (getExpiryDoc && getServerUsernameDoc) {
      let time = getExpiryDoc.global_flag;
      let serverName = getServerUsernameDoc.global_flag;
      time = typeof time === 'number' ? time : Number(time);
      serverName =
        typeof serverName === 'string' ? serverName : String(serverName);
      const jwtObject = new EncryptJWT(payload)
        .setProtectedHeader({
          alg: 'dir',
          enc: 'A256GCM',
        })
        .setAudience(String(user._id))
        .setExpirationTime(type === 'login' ? `${time}d` : `${time}h`)
        .setIssuedAt()
        .setIssuer(`${serverName}:server`);

      const algorithm = 'HS256';
      const key = await importJWK(secretKey.key, algorithm);
      const encryptedString = await jwtObject.encrypt(key);
      return encryptedString;
    } else {
      throw new InternalServerError(
        'Cannot Find Expiry Timings & Server username in the Settings Collection, Please Set them',
      );
    }
  } else {
    throw new InternalServerError(
      'Private Key Not Found in the Database, Please Generate it and Try',
    );
  }
}
