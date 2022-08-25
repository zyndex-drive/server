import { hashString } from './hash';
import { fieldsPicker } from '@plugins/db/helpers';
import { logger } from '@plugins';

import type { Document, Model, Schema, HookNextFunction } from 'mongoose';

/**
 * Creates a Hash Plugin which will add option to hash Fields using Bcrypt in a Schema
 *
 * @returns {Function} Hash Plugin
 */
export function hashPlugin<T, U extends Document, V extends Model<U>>(): (
  schema: Schema<U, V, T>,
) => void {
  const plugin = (schema: Schema<U, V, T>): void => {
    const toHashFields: string[] = fieldsPicker<T, U, V>(schema, 'hash');
    schema.pre('validate', function (this: U, next: HookNextFunction) {
      try {
        const hashedDoc = hashString<U>(this, toHashFields);
        this.set(hashedDoc);
        next();
      } catch (e) {
        logger.error(`Error Occured in Encrypt Plugin:Mongoose: ${String(e)}`);
        next();
      }
    });
  };
  return plugin;
}
