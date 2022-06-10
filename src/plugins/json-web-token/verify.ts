import { jwtDecrypt, importJWK } from 'jose';

import type { JWTDecryptResult } from 'jose';
import { Keys } from '@models';

/**
 * Decrypts the JSON Web Token
 *
 * @param {string} jwt - JWT String
 * @returns {Promise<JWTDecryptResult>} - JWT Decrypted Result
 */
export default async function (jwt: string): Promise<JWTDecryptResult> {
  const secretKey = await Keys.findOne({ type: 'secretkey' });
  if (secretKey) {
    const algorithm = 'HS256';
    const key = await importJWK(secretKey.key, algorithm);
    const decrypted = await jwtDecrypt(jwt, key);
    return decrypted;
  } else {
    throw new Error('No Public Key is Found in the Database');
  }
}
