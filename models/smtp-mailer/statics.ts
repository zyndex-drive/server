import {
  createDocument,
  createMultipleDocuments,
  clearCollection,
} from '@plugins/db/statics';
import encryptedFields from './encrypted-fields';

// Types
import type { ISMTPMailer, ISMTPMailerDoc, ISMTPMailerModel } from './types';
import type { Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Create a SMTP Mailer Document and Save it to Database
 *
 * @param {ISMTPMailerModel} this - SMTP Mailer Model
 * @param {ISMTPMailer} doc - SMTP Mailer to be Created and Saved
 * @returns {Promise<ISMTPMailerDoc>} - Promise Returning Saved Document
 */
export function createDoc(
  this: ISMTPMailerModel,
  doc: ISMTPMailer,
): Promise<ISMTPMailerDoc> {
  return createDocument<ISMTPMailer, ISMTPMailerDoc, ISMTPMailerModel>(
    this,
    doc,
    encryptedFields,
  );
}

/**
 * Create a SMTP Mailer Document and Save it to Database
 *
 * @param {ISMTPMailerModel} this - SMTP Mailer Model
 * @param {ISMTPMailer[]} docs - SMTP Mailer to be Created and Saved
 * @returns {Promise<ISMTPMailerDoc[]>} - Promise Returning Saved Document
 */
export function createMultiDoc(
  this: ISMTPMailerModel,
  docs: ISMTPMailer[],
): Promise<ISMTPMailerDoc[]> {
  return createMultipleDocuments<ISMTPMailer, ISMTPMailerDoc, ISMTPMailerModel>(
    this,
    docs,
    encryptedFields,
  );
}

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
  schema.statics.createDoc = createDoc;
  schema.statics.createMultiDoc = createMultiDoc;
  schema.statics.clearAll = clearAll;
  return schema;
}
