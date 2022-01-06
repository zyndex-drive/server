import { EncryptJWT, importSPKI } from 'jose';

import type { IUserDoc } from '@models/user/types';
import type { errors, JWTPayload } from 'jose';

/**
 * Generates a JWT using Private Key for a Particular User
 *
 * @param {IUserDoc} user - User Document from Database
 * @param {Object} payload - Payload to Sign and Encrypt
 * @returns {Promise<string>} - Promise Resolving to JWT
 */
export default function (user: IUserDoc, payload: JWTPayload): Promise<string> {
  return new Promise<string>((resolve, reject) => {
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
      importSPKI(PRIVATE_KEY, algorithm)
        .then((key) => jwtObject.encrypt(key))
        .then(resolve)
        .catch((err: errors.JOSEError) => {
          reject(new Error(`${err.name}: ${err.message}`));
        });
    } else {
      reject(new Error('No Private Key is Found in the Environment Variables'));
    }
  });
}
