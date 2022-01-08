import { jwtDecrypt, importSPKI } from 'jose';

import type { JWTDecryptResult, errors } from 'jose';

/**
 * Decrypts the JSON Web Token
 *
 * @param {string} jwt - JWT String
 * @returns {Promise<JWTDecryptResult>} - JWT Decrypted Result
 */
export default function (jwt: string): Promise<JWTDecryptResult> {
  return new Promise<JWTDecryptResult>((resolve, reject) => {
    const { PUBLIC_KEY } = process.env;
    if (PUBLIC_KEY) {
      const algorithm = 'RS256';
      importSPKI(PUBLIC_KEY, algorithm)
        .then((key) => jwtDecrypt(jwt, key))
        .then(resolve)
        .catch((err: errors.JOSEError) => {
          reject(new Error(`${err.name}: ${err.message}`));
        });
    } else {
      reject(new Error('No Public Key is Found in the Environment Variables'));
    }
  });
}
