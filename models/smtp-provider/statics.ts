import { createDocument, clearCollection } from '@plugins/db';

// Types
import { ISMTPProvider, ISMTPProviderDoc, ISMTPProviderModel } from './types';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Create a SMTP Provider Document and Save it to Database
 *
 * @param {ISMTPProviderModel} this - SMTP Provider Model
 * @param {ISMTPProvider} doc - SMTP Provider to be Created and Saved
 * @returns {Promise<ISMTPProviderDoc>} - Promise Returning Saved Document
 */
export function createDoc(
  this: ISMTPProviderModel,
  doc: ISMTPProvider,
): Promise<ISMTPProviderDoc> {
  return createDocument<ISMTPProvider, ISMTPProviderDoc, ISMTPProviderModel>(
    this,
    doc,
  );
}

/**
 * Clears the SMTP Provider Collection by Deleting all the Records
 *
 * @param {ISMTPProviderModel} this - SMTP Provider Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(
  this: ISMTPProviderModel,
): Promise<IInlineResponse<string>> {
  return clearCollection<ISMTPProviderDoc, ISMTPProviderModel>(this);
}
