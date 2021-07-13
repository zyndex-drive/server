import createDocument from '@helpers/models/static/create-document';
import clearCollection from '@helpers/models/static/clear-collection';

// Types
import { ISMTPMailer, ISMTPMailerDoc, ISMTPMailerModel } from './types';
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
