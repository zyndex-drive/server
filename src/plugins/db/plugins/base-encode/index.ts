import { fieldsPicker, encodeFields, decodeFields } from '@plugins/db/helpers';

import type { Document, Model, Schema, HookNextFunction } from 'mongoose';

/**
 * Creates a Base64 Encoder Plugin which will add option to Encode Fields in a Schema
 *
 * @returns {Function} Base64 Plugin
 */
export default function <T, U extends Document, V extends Model<U>>(): (
  schema: Schema<U, V, T>,
) => void {
  const plugin = (schema: Schema<U, V, T>): void => {
    const toEncodeFields: string[] = fieldsPicker<T, U, V>(
      schema,
      'base64encode',
    );
    schema.pre('validate', function (this: U, next: HookNextFunction) {
      const encodedDoc = encodeFields<U>(this, toEncodeFields);
      this.set(encodedDoc);
      next();
    });
    schema.post('init', function (this: U) {
      const decodedDoc = decodeFields<U>(this, toEncodeFields);
      return decodedDoc;
    });
  };
  return plugin;
}
