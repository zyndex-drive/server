import { clearCollection } from '@plugins/db/statics';

// Types
import type { IOtpDoc, IOtpModel } from './types';
import type { Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Clears the Session Collection by Deleting all the Records
 *
 * @param {IOtpModel} this - Session Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(this: IOtpModel): Promise<IInlineResponse<string>> {
  return clearCollection<IOtpDoc, IOtpModel>(this);
}

/**
 * Appends all the Static Helpers with Schema
 *
 * @param {Schema<IOtpDoc, IOtpModel>} schema - Model Schema
 * @returns {Schema<IOtpDoc, IOtpModel>} - Schema with Static Helpers
 */
export default function (
  schema: Schema<IOtpDoc, IOtpModel>,
): Schema<IOtpDoc, IOtpModel> {
  schema.statics.clearAll = clearAll;
  return schema;
}
