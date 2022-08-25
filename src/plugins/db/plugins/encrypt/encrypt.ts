import { encrypt, decrypt } from '@plugins/crypto';
import dotProp from 'dot-prop';

/**
 * Encrypts Particular Fields in a Object
 *
 * @param {Object} obj - Object to Encrypt Fields
 * @param {string[]} encryptedFields - Array of Fields to Encrypt
 * @returns {Object} Object with Encrypted Fields
 */
export function encryptFields<T>(obj: T, encryptedFields?: string[]): T {
  let modObj = obj;
  if (encryptedFields) {
    encryptedFields.forEach((field) => {
      if (dotProp.has(obj, field)) {
        const inValue = dotProp.get(obj, field);
        const cryptoData = {
          data: inValue,
        };
        const result = encrypt.aes.obj<unknown>(cryptoData);
        modObj = dotProp.set(modObj, field, result);
      }
    });
    return modObj;
  }
  return modObj;
}

/**
 * Decrypts Particular Fields in a Object
 *
 * @param {Object} obj - Encrypted Object
 * @param {string[]} encryptedFields - Array of Fields to Encrypt
 * @returns {Object} Object with Decrypted Fields
 */
export function decryptFields<T>(obj: T, encryptedFields?: string[]): T {
  let modObj = obj;
  if (encryptedFields) {
    encryptedFields.forEach((field) => {
      if (dotProp.has(obj, field)) {
        const inValue = dotProp.get(obj, field);
        if (typeof inValue === 'string') {
          const result = decrypt.aes.obj<unknown>(inValue);
          modObj = dotProp.set(modObj, field, result);
        }
      }
    });
    return modObj;
  }
  return modObj;
}
