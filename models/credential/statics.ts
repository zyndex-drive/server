import createDocument from '@helpers/models/static/create-document';
import clearCollection from '@helpers/models/static/clear-collection';

// Types
import { ICredentials, ICredentialsDoc, ICredentialsModel } from './types';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Create a Credential Document and Save it to Database
 *
 * @param {ICredentialsModel} this - BlacklistedUser Model
 * @param {ICredentials} doc - Credentials Doc to be Created and Saved
 * @returns {Promise<ICredentialsDoc>} - Promise Returning Saved Document
 */
export function createDoc(
  this: ICredentialsModel,
  doc: ICredentials,
): Promise<ICredentialsDoc> {
  return createDocument<ICredentials, ICredentialsDoc, ICredentialsModel>(
    this,
    doc,
  );
}

/**
 * Clears the Credentials Collection by Deleting all the Records
 *
 * @param {ICredentialsModel} this - Credentials Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(
  this: ICredentialsModel,
): Promise<IInlineResponse<string>> {
  return clearCollection<ICredentialsDoc, ICredentialsModel>(this);
}
