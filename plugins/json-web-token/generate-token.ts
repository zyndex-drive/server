import { EncryptJWT, importSPKI } from 'jose';

import type { IUserDoc } from '@models/user/types';
import type { errors } from 'jose';

/**
 * Generates a JWT using Private Key for a Particular User
 *
 * @param {IUserDoc} user - User Document from Database
 * @returns {Promise<string>} - Promise Resolving to JWT
 */
export default function (user: IUserDoc): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const { PRIVATE_KEY } = process.env;
    if (PRIVATE_KEY) {
      const payload = new EncryptJWT({
        user_id: user._id,
        user_email: user.email,
      })
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
        .then((key) => payload.encrypt(key))
        .then(resolve)
        .catch((err: errors.JOSEError) => {
          reject(new Error(`${err.name}: ${err.message}`));
        });
    } else {
      reject(new Error('No Private Key is Found in the Environment Variables'));
    }
  });
}
