import { promisify } from 'util';
import { generateKeyPair } from 'crypto';

const promisedgenerateKeyPair = promisify(generateKeyPair);

interface IKeyPairs {
  privateKey: string;
  publicKey: string;
}

/**
 * Generates a PEM based Public and Private Keys
 *
 * @returns {Promise<IKeyPairs>} - Promise Resolving to Key pairs
 */
export default function (): Promise<IKeyPairs> {
  return new Promise<IKeyPairs>((resolve, reject) => {
    const { GLOBAL_PASSPHRASE } = process.env;
    if (GLOBAL_PASSPHRASE) {
      promisedgenerateKeyPair('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
          cipher: 'aes-256-cbc',
          passphrase: GLOBAL_PASSPHRASE,
        },
      })
        .then(resolve)
        .catch((err) => {
          reject(new Error(String(err)));
        });
    } else {
      reject(
        new Error('No Global Passphrase is Found in the Environment Variables'),
      );
    }
  });
}
