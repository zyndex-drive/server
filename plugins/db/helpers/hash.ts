import bcrypt from 'bcrypt';
import dotProp from 'dot-prop';

/**
 * Hashes Particular Fields in a Object
 *
 * @param {Object} obj - Object to Hash Fields
 * @param {string[]} encryptedFields - Array of Fields to Hash
 * @returns {Object} Object with Hashed Fields
 */
export default function <T>(obj: T, encryptedFields?: string[]): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    try {
      if (encryptedFields) {
        const forLoopPromise = new Promise<T>((resolve, reject) => {
          let modObj = obj;
          encryptedFields.forEach((field: string, index: number) => {
            if (dotProp.has(obj, field)) {
              const inValue = dotProp.get(obj, field);
              if (typeof inValue === 'string') {
                bcrypt
                  .hash(inValue, 10)
                  .then((result) => {
                    modObj = dotProp.set(modObj, field, result);
                  })
                  .catch((err: string) => {
                    reject(err);
                  });
              }
            }
            if (index === encryptedFields.length - 1) resolve(modObj);
          });
        });
        forLoopPromise
          .then((modObj) => resolve(modObj))
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}
