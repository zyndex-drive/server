import { EncryptJWT, importSPKI } from 'jose';

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
  const { PRIVATE_KEY } = process.env;
  if (PRIVATE_KEY) {
    const jwtObject = new EncryptJWT(payload)
      .setProtectedHeader({
        alg: '',
        enc: '',
      })
      .setAudience(String(user._id))
      .setExpirationTime('1m')
      .setIssuedAt()
      .setNotBefore('1m')
      .setIssuer('zyndex:server');

    const algorithm = 'RS256';
    const key = await importSPKI(PRIVATE_KEY, algorithm);
    const encryptedString = await jwtObject.encrypt(key);
    return encryptedString;
  } else {
    throw new Error('No Private Key is Found in the Environment Variables');
  }
}
