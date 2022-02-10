import dotProp from 'dot-prop';

/**
 * Encode Particular Fields with Base64 in a Object
 *
 * @param {Object} obj - Object to Encrypt Fields
 * @param {string[]} encryptedFields - Array of Fields to Encrypt
 * @returns {Object} Object with Encrypted Fields
 */
export function encodeFields<T>(obj: T, encryptedFields?: string[]): T {
  let modObj = obj;
  if (encryptedFields) {
    encryptedFields.forEach((field) => {
      if (dotProp.has(obj, field)) {
        const inValue = dotProp.get(obj, field);
        if (typeof inValue === 'string') {
          const encryptedValue = Buffer.from(inValue).toString('base64');
          modObj = dotProp.set(modObj, field, encryptedValue);
        }
      }
    });
  }
  return modObj;
}

/**
 * Decode Particular Fields with Base64 in a Object
 *
 * @param {Object} obj - Encoded Object
 * @param {string[]} encryptedFields - Array of Fields to Decode
 * @returns {Object} Object with Decoded Fields
 */
export function decodeFields<T>(obj: T, encryptedFields?: string[]): T {
  let modObj = obj;
  if (encryptedFields) {
    encryptedFields.forEach((field) => {
      if (dotProp.has(obj, field)) {
        const inValue = dotProp.get(obj, field);
        let decryptedValue;
        if (typeof inValue === 'string') {
          decryptedValue = Buffer.from(inValue, 'base64').toString('utf8');
        }
        modObj = dotProp.set(modObj, field, decryptedValue);
      }
    });
  }
  return modObj;
}
