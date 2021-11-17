import { encrypt } from '@plugins/crypto';

/**
 * Encrypts Particular Fields in a Object
 *
 * @param {Object} obj - Object to Encrypt Fields
 * @param {string[]} encryptedFields - Array of Fields to Encrypt
 * @returns {Object} Object with Encrypted Fields
 */
export default function <T>(obj: T, encryptedFields?: string[]): T {
  const modObj = obj;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (encryptedFields && encryptedFields.includes(key)) {
        if (typeof obj[key] === 'string') {
          Object.defineProperty(modObj, key, encrypt.str(String(obj[key])));
        }
      }
    }
  }
  return modObj;
}
