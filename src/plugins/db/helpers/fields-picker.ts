/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import dotProp from 'dot-prop';
import type { Document, Model, Schema, SchemaType } from 'mongoose';

/**
 * Parse SchemType Objects to handle Custom Schema Options
 *
 * @param {Schema} schema - Mongoose Object Schema
 * @param {string} criteria - Custom Option in the Schema to Check
 * @returns {string[]} - Array of path names passing the criteria
 */
export default function <T, U extends Document, V extends Model<U>>(
  schema: Schema<U, V, T>,
  criteria: string,
): string[] {
  const pickedFields: string[] = [];
  schema.eachPath((path: string, schemaType: SchemaType) => {
    const keys = Object.keys(schemaType);
    const props = Object.create(schemaType);
    if (keys && props) {
      const options = props['options'];
      if (dotProp.has(options, criteria)) {
        pickedFields.push(path);
      }
    }
  });
  return pickedFields;
}
