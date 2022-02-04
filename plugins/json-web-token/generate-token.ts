import { Keys } from '@models';
import { EncryptJWT, importJWK } from 'jose';

import type { IUserLeanDoc } from '@models/types';
import type { JWTPayload } from 'jose';

/**
 * Generates a JWT using Private Key for a Particular User
 *
 * @param {IUserLeanDoc} user - User Document from Database
 * @param {Object} payload - Payload to Sign and Encrypt
 * @returns {Promise<string>} - Promise Resolving to JWT
 */
export default async function (
  user: IUserLeanDoc,
  payload: JWTPayload,
): Promise<string> {
  const secretKey = await Keys.findOne({ type: 'secretkey' });
  if (secretKey) {
    const jwtObject = new EncryptJWT(payload)
      .setProtectedHeader({
        alg: 'dir',
        enc: 'A256GCM',
      })
      .setAudience(String(user._id))
      .setExpirationTime('1m')
      .setIssuedAt()
      .setNotBefore('1m')
      .setIssuer('zyndex:server');

    const algorithm = 'HS256';
    const key = await importJWK(secretKey.key, algorithm);
    const encryptedString = await jwtObject.encrypt(key);
    return encryptedString;
  } else {
    throw new Error(
      'Private Key Not Found in the Database, Please Generate it and Try',
    );
  }
}
