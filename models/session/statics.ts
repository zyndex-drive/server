import { createDocument, clearCollection } from '@plugins/db';

// Types
import { ISession, ISessionDoc, ISessionModel } from './types';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Create a Session Document and Save it to Database
 *
 * @param {ISessionModel} this - Session Model
 * @param {ISession} doc - Session to be Created and Saved
 * @returns {Promise<ISessionDoc>} - Promise Returning Saved Document
 */
export function createDoc(
  this: ISessionModel,
  doc: ISession,
): Promise<ISessionDoc> {
  return createDocument<ISession, ISessionDoc, ISessionModel>(this, doc);
}

/**
 * Clears the Session Collection by Deleting all the Records
 *
 * @param {ISessionModel} this - Session Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(
  this: ISessionModel,
): Promise<IInlineResponse<string>> {
  return clearCollection<ISessionDoc, ISessionModel>(this);
}
