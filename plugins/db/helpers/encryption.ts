import { encrypt, decrypt } from '@plugins/crypto';
import type { IEncryptFunction, IDecryptFunction } from '@plugins/crypto/types';

type iterFunc = IEncryptFunction | IDecryptFunction;

const iterateNFunc = <T>(
  obj: T,
  func: iterFunc,
  encryptedFields?: string[],
): T => {
  const modObj = obj;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (encryptedFields && encryptedFields.includes(key)) {
        if (typeof obj[key] === 'string') {
          Object.defineProperty(modObj, key, func.str(String(obj[key])));
        }
      }
    }
  }
  return modObj;
};

/**
 * Encrypts Particular Fields in a Object
 *
 * @param {Object} obj - Object to Encrypt Fields
 * @param {string[]} encryptedFields - Array of Fields to Encrypt
 * @returns {Object} Object with Encrypted Fields
 */
export function encryptFields<T>(obj: T, encryptedFields?: string[]): T {
  const modifiedObj = iterateNFunc<T>(obj, encrypt, encryptedFields);
  return modifiedObj;
}

/**
 * Decrypts Particular Fields in a Object
 *
 * @param {Object} obj - Encrypted Object
 * @param {string[]} encryptedFields - Array of Fields to Encrypt
 * @returns {Object} Object with Decrypted Fields
 */
export function decryptFields<T>(obj: T, encryptedFields?: string[]): T {
  const modifiedObj = iterateNFunc<T>(obj, decrypt, encryptedFields);
  return modifiedObj;
}
