import crypto from 'crypto-js';

// Types
import type { ICryptoObjData, IDecryptFunction } from './types';

/**
 * Crypto - Decrypt Helpers
 */
const decrypt: IDecryptFunction = {
  /**
   * Decrypt String Encrypted with AES Algorithm
   *
   * @param {string} encryptedStr - Data to be Decrypted
   * @returns { string } - Decrypted String
   */
  str: (encryptedStr: string): string => {
    const PASSPHRASE = process.env.GLOBAL_PASSPHRASE;
    if (PASSPHRASE) {
      const decryptedStr: string = crypto.AES.decrypt(
        encryptedStr,
        PASSPHRASE,
      ).toString(crypto.enc.Utf8);
      return decryptedStr;
    } else {
      throw new Error('Passphrase not set in Variables, Kindly Set that');
    }
  },

  /**
   * Decrypt Object Encrypted with AES Algorithm
   *
   * @param {string} cryptText - Data to be Decrypted
   * @returns { string } - Decrypted Object
   */
  obj: <T>(cryptText: string): ICryptoObjData<T> => {
    const PASSPHRASE = process.env.GLOBAL_PASSPHRASE;
    if (PASSPHRASE) {
      const decryptedData: ICryptoObjData<T> = JSON.parse(
        crypto.AES.decrypt(cryptText, PASSPHRASE).toString(crypto.enc.Utf8),
      );
      return decryptedData;
    } else {
      throw new Error('Passphrase not set in Variables, Kindly Set that');
    }
  },
};

export default decrypt;
