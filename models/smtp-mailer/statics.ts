import { clearCollection } from '@plugins/db/statics';

// Types
import type { ISMTPMailerDoc, ISMTPMailerModel } from './types';
import type { Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Clears the SMTP Mailer Collection by Deleting all the Records
 *
 * @param {ISMTPMailerModel} this - SMTP Mailer Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(
  this: ISMTPMailerModel,
): Promise<IInlineResponse<string>> {
  return clearCollection<ISMTPMailerDoc, ISMTPMailerModel>(this);
}

/**
 * Appends all the Static Helpers with Schema
 *
 * @param {Schema<ISMTPMailerDoc, ISMTPMailerModel>} schema - Model Schema
 * @returns {Schema<ISMTPMailerDoc, ISMTPMailerModel>} - Schema with Static Helpers
 */
export default function (
  schema: Schema<ISMTPMailerDoc, ISMTPMailerModel>,
): Schema<ISMTPMailerDoc, ISMTPMailerModel> {
  schema.statics.clearAll = clearAll;
  return schema;
}
