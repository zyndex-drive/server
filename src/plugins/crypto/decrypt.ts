import { compactDecrypt, importJWK } from 'jose';
import { createDecipheriv } from 'crypto';
import { Keys } from '@models';

// Types
import type { ICryptoObjData, IDecryptFunction } from './types';

/**
 * Crypto - Decrypt Helpers
 */
const decrypt: IDecryptFunction = {
  aes: {
    /**
     * Decrypt String Encrypted with AES Algorithm
     *
     * @param {string} encryptedStr - Data to be Decrypted
     * @returns {string} - Decrypted String
     */
    str: (encryptedStr: string): string => {
      const { GLOBAL_PASSPHRASE, IV } = process.env;
      if (GLOBAL_PASSPHRASE && IV) {
        const algorithm = 'aes-256-cbc';
        const [iv, secret] = [
          Buffer.from(IV, 'hex'),
          Buffer.from(GLOBAL_PASSPHRASE, 'hex'),
        ];
        const decipher = createDecipheriv(algorithm, secret, iv);
        let decryptedData = decipher.update(encryptedStr, 'hex', 'utf-8');
        decryptedData += decipher.final('utf8');
        return decryptedData;
      } else {
        throw new Error(
          'GLOBAL_PASSPHRASE, IV not found in Environment Variables, Kindly Setup',
        );
      }
    },

    /**
     * Decrypt Object Encrypted with AES Algorithm
     *
     * @param {string} encryptedStr - Data to be Decrypted
     * @returns {Object} - Decrypted Object
     */
    obj: <T>(encryptedStr: string): T => {
      const { GLOBAL_PASSPHRASE, IV } = process.env;
      if (GLOBAL_PASSPHRASE && IV) {
        const algorithm = 'aes-256-cbc';
        const [iv, secret] = [
          Buffer.from(IV, 'hex'),
          Buffer.from(GLOBAL_PASSPHRASE, 'hex'),
        ];
        const decipher = createDecipheriv(algorithm, secret, iv);
        let decryptedData = decipher.update(encryptedStr, 'hex', 'utf-8');
        decryptedData += decipher.final('utf8');
        const jsonData: ICryptoObjData<T> = JSON.parse(decryptedData);
        return jsonData.data;
      } else {
        throw new Error(
          'GLOBAL_PASSPHRASE, IV not found in Environment Variables, Kindly Setup',
        );
      }
    },
  },
  rsa: {
    /**
     * Decrypt String Encrypted with RSA Algorithm
     *
     * @param {string} encryptedStr - Data to be Decrypted
     * @returns {Promise<string>} - Decrypted String
     */
    str: async (encryptedStr: string): Promise<string> => {
      const privateKey = await Keys.findOne({ type: 'privatekey' }).exec();
      if (privateKey) {
        const pvtKey = await importJWK(privateKey.key, 'PS256');
        const { plaintext } = await compactDecrypt(encryptedStr, pvtKey);
        const decodedText = new TextDecoder().decode(plaintext);
        return decodedText;
      } else {
        throw new Error(
          'Private Key Not Available in the Database, Please Setup first, then try this',
        );
      }
    },

    /**
     * Decrypt Object Encrypted with RSA Algorithm
     *
     * @param {string} encryptedStr - Data to be Decrypted
     * @returns {Promise<Object>} - Decrypted Object
     */
    obj: async <T>(encryptedStr: string): Promise<T> => {
      const privateKey = await Keys.findOne({ type: 'privatekey' }).exec();
      if (privateKey) {
        const pvtKey = await importJWK(privateKey.key, 'PS256');
        const { plaintext } = await compactDecrypt(encryptedStr, pvtKey);
        const decodedText = new TextDecoder().decode(plaintext);
        const objectData: ICryptoObjData<T> = JSON.parse(decodedText);
        return objectData.data;
      } else {
        throw new Error(
          'Private Key Not Available in the Database, Please Setup first, then try this',
        );
      }
    },
  },
};

export default decrypt;
