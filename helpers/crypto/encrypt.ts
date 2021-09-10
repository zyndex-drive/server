import crypto from 'crypto-js';

// Types
import { ICryptoData } from './types';

/**
 * Encrypts Data with AES Method
 *
 * @param {string | object} data - Data to be Encrypted
 * @returns { string } - Encrypted Data
 */
export default function <T>(data: ICryptoData<T>): string {
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
}
