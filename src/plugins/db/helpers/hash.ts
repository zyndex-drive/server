import bcrypt from 'bcrypt';
import dotProp from 'dot-prop';

/**
 * Hashes Particular Fields in a Object
 *
 * @param {Object} obj - Object to Hash Fields
 * @param {string[]} encryptedFields - Array of Fields to Hash
 * @returns {Object} Object with Hashed Fields
 */
export default function <T>(obj: T, encryptedFields?: string[]): T {
  let modObj = obj;
  if (encryptedFields) {
    encryptedFields.forEach((field: string) => {
      if (dotProp.has(obj, field)) {
        const inValue = dotProp.get(obj, field);
        if (typeof inValue === 'string') {
          const hash = bcrypt.hashSync(inValue, 10);
          modObj = dotProp.set(modObj, field, hash);
        }
      }
    });
    return modObj;
  }
  return modObj;
}
