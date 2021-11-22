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
        let encryptedValue: string;
        if (typeof inValue === 'string') {
          encryptedValue = encrypt.str(inValue);
        } else {
          const cryptoData = {
            data: inValue,
          };
          encryptedValue = encrypt.obj<unknown>(cryptoData);
        }
        modObj = dotProp.set(modObj, field, encryptedValue);
      }
    });
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
        let decryptedValue;
        if (typeof inValue === 'string') {
          decryptedValue = decrypt.str(inValue);
        }
        modObj = dotProp.set(modObj, field, decryptedValue);
      }
    });
  }
  return modObj;
}
