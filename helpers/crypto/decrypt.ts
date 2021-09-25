import crypto from 'crypto-js';

// Types
import { ICryptoData } from './types';

/**
 * Decrypts Data with AES Method
 *
 * @param {string} cryptText - Data to be Decrypted
 * @returns { string } - Encrypted Data
 */
export default function <T>(cryptText: string): ICryptoData<T> {
  const PASSPHRASE = process.env.GLOBAL_PASSPHRASE;
  if (PASSPHRASE) {
    const decryptedData: ICryptoData<T> = JSON.parse(
      crypto.AES.decrypt(cryptText, PASSPHRASE).toString(crypto.enc.Utf8),
    );
    return decryptedData;
  } else {
    throw new Error('Passphrase not set in Variables, Kindly Set that');
  }
}
