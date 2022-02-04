import bcrypt from 'bcrypt';
import dotProp from 'dot-prop';

/**
 * Hashes Particular Fields in a Object
 *
 * @param {Object} obj - Object to Hash Fields
 * @param {string[]} encryptedFields - Array of Fields to Hash
 * @returns {Object} Object with Hashed Fields
 */
export default async function <T>(
  obj: T,
  encryptedFields?: string[],
): Promise<T> {
  let modObj = obj;
  if (encryptedFields) {
    const promises = encryptedFields.map(
      (field: string) =>
        new Promise<void>((resolve, reject) => {
          if (dotProp.has(obj, field)) {
            const inValue = dotProp.get(obj, field);
            if (typeof inValue === 'string') {
              bcrypt
                .hash(inValue, 10)
                .then((result) => {
                  modObj = dotProp.set(obj, field, result);
                  resolve();
                })
                .catch((err: string) => {
                  reject(err);
                });
            }
          }
        }),
    );
    await Promise.all(promises);
    return modObj;
  }
  return modObj;
}
