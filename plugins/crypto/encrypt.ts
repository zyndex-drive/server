import { CompactEncrypt, importJWK } from 'jose';
import { createCipheriv } from 'crypto';
import { Keys } from '@models';

// Types
import type { ICryptoObjData, IEncryptFunction } from './types';

/**
 * Crypto - Encrypt Helpers
 */
const encrypt: IEncryptFunction = {
  aes: {
    /**
     * Encrypt a String using AES Algorithm
     *
     * @param {string} str - String to Encrypt
     * @returns {Promise<string>} - Encrypted String
     */
    str: (str: string): string => {
      const { GLOBAL_PASSPHRASE, IV } = process.env;
      if (GLOBAL_PASSPHRASE && IV) {
        const algorithm = 'aes-256-cbc';
        const [iv, secret] = [
          Buffer.from(IV, 'hex'),
          Buffer.from(GLOBAL_PASSPHRASE, 'hex'),
        ];
        const cipher = createCipheriv(algorithm, secret, iv);
        let encryptedData = cipher.update(str, 'utf-8', 'hex');
        encryptedData += cipher.final('hex');
        return encryptedData;
      } else {
        throw new Error(
          'GLOBAL_PASSPHRASE, IV not found in Environment Variables, Kindly Setup',
        );
      }
    },

    /**
     * Encrypts Data with AES Method
     *
     * @param {ICryptoObjData<Object>} data - Data to be Encrypted
     * @returns {Promise<string>} - Encrypted Data
     */
    obj: <T>(data: ICryptoObjData<T>): string => {
      const { GLOBAL_PASSPHRASE, IV } = process.env;
      if (GLOBAL_PASSPHRASE && IV) {
        const algorithm = 'aes-256-cbc';
        const [iv, secret] = [
          Buffer.from(IV, 'hex'),
          Buffer.from(GLOBAL_PASSPHRASE, 'hex'),
        ];
        const cipher = createCipheriv(algorithm, secret, iv);
        const dataToEncrypt = JSON.stringify(data);
        let encryptedData = cipher.update(dataToEncrypt, 'utf-8', 'hex');
        encryptedData += cipher.final('hex');
        return encryptedData;
      } else {
        throw new Error(
          'GLOBAL_PASSPHRASE, IV not found in Environment Variables, Kindly Setup',
        );
      }
    },
  },
  rsa: {
    /**
     * Encrypt a String using RSA Algorithm
     *
     * @param {string} str - String to Encrypt
     * @returns {Promise<string>} - Encrypted String
     */
    str: async (str: string): Promise<string> => {
      const publicKey = await Keys.findOne({ type: 'publickey' }).exec();
      if (publicKey) {
        const toEncrypt = new CompactEncrypt(
          new TextEncoder().encode(str),
        ).setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' });
        const pubKey = await importJWK(publicKey.key, 'PS256');
        const encryptedString = await toEncrypt.encrypt(pubKey);
        return encryptedString;
      } else {
        throw new Error(
          'Public Key Not Available in the Database, Please Setup first, then try this',
        );
      }
    },

    /**
     * Encrypts Data with RSA Method
     *
     * @param {string | object} data - Data to be Encrypted
     * @returns {Promise<string>} - Encrypted Data
     */
    obj: async <T>(data: ICryptoObjData<T>): Promise<string> => {
      const publicKey = await Keys.findOne({ type: 'publickey' }).exec();
      if (publicKey) {
        const toEncrypt = new CompactEncrypt(
          new TextEncoder().encode(JSON.stringify(data)),
        ).setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' });
        const pubKey = await importJWK(publicKey.key, 'PS256');
        const encryptedData = await toEncrypt.encrypt(pubKey);
        return encryptedData;
      } else {
        throw new Error(
          'Public Key Not Available in the Database, Please Setup first, then try this',
        );
      }
    },
  },
};

export default encrypt;
