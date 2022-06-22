import {
  fieldsPicker,
  encryptFields,
  decryptFields,
} from '@plugins/db/helpers';

import type { Document, Model, Schema, HookNextFunction } from 'mongoose';

/**
 * Creates a Crypto Plugin which will add option to encrypt Fields in a Schema
 *
 * @returns {Function} Crypto Plugin
 */
export default function <T, U extends Document, V extends Model<U>>(): (
  schema: Schema<U, V, T>,
) => void {
  const plugin = (schema: Schema<U, V, T>): void => {
    const encryptedFields: string[] = fieldsPicker<T, U, V>(schema, 'encrypt');
    schema.pre('validate', function (this: U, next: HookNextFunction) {
      try {
        const encryptedDoc = encryptFields(this, encryptedFields);
        this.set(encryptedDoc);
        next();
      } catch (e) {
        console.log(`Error Occured in Encrypt Plugin:Mongoose: ${String(e)}`);
        next();
      }
    });
    schema.post('init', function (this: U) {
      const decryptedDoc = decryptFields<U>(this, encryptedFields);
      return decryptedDoc;
    });
  };
  return plugin;
}
