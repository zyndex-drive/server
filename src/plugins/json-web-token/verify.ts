import { jwtDecrypt, importSPKI } from 'jose';

import type { JWTDecryptResult } from 'jose';

/**
 * Decrypts the JSON Web Token
 *
 * @param {string} jwt - JWT String
 * @returns {Promise<JWTDecryptResult>} - JWT Decrypted Result
 */
export default async function (jwt: string): Promise<JWTDecryptResult> {
  const { PUBLIC_KEY } = process.env;
  if (PUBLIC_KEY) {
    const algorithm = 'RS256';
    const key = await importSPKI(PUBLIC_KEY, algorithm);
    const decrypted = await jwtDecrypt(jwt, key);
    return decrypted;
  } else {
    throw new Error('No Public Key is Found in the Environment Variables');
  }
}
