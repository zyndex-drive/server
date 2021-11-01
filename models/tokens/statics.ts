import { createDocument, clearCollection } from '@plugins/db';

// Types
import { IToken, ITokenDoc, ITokenModel } from './types';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Create a SMTP Provider Document and Save it to Database
 *
 * @param {ITokenModel} this - SMTP Provider Model
 * @param {IToken} doc - SMTP Provider to be Created and Saved
 * @returns {Promise<ITokenDoc>} - Promise Returning Saved Document
 */
export function createDoc(this: ITokenModel, doc: IToken): Promise<ITokenDoc> {
  return createDocument<IToken, ITokenDoc, ITokenModel>(this, doc);
}

/**
 * Clears the SMTP Provider Collection by Deleting all the Records
 *
 * @param {ITokenModel} this - SMTP Provider Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(this: ITokenModel): Promise<IInlineResponse<string>> {
  return clearCollection<ITokenDoc, ITokenModel>(this);
}
