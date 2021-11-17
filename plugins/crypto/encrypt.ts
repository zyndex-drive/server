import crypto from 'crypto-js';

// Types
import type { ICryptoObjData, IEncryptFunction } from './types';

/**
 * Crypto - Encrypt Helpers
 */
const encrypt: IEncryptFunction = {
  /**
   * Encrypt a String using AES Algorithm
   *
   * @param {string} str - String to Encrypt
   * @returns {string} - Encrypted String
   */
  str: (str: string): string => {
    const PASSPHRASE = process.env.GLOBAL_PASSPHRASE;
    if (PASSPHRASE) {
      const encryptedData = crypto.AES.encrypt(str, PASSPHRASE).toString();
      return encryptedData;
    } else {
      throw new Error('Passphrase not set in Variables, Kindly Set that');
    }
  },

  /**
   * Encrypts Data with AES Method
   *
   * @param {string | object} data - Data to be Encrypted
   * @returns { string } - Encrypted Data
   */
  obj: <T>(data: ICryptoObjData<T>): string => {
    const PASSPHRASE = process.env.GLOBAL_PASSPHRASE;
    if (PASSPHRASE) {
      const encryptedData = crypto.AES.encrypt(
        JSON.stringify(data),
        PASSPHRASE,
      ).toString();
      return encryptedData;
    } else {
      throw new Error('Passphrase not set in Variables, Kindly Set that');
    }
  },
};

export default encrypt;
