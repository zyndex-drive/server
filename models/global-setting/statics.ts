import { createDocument, clearCollection } from '@plugins/db';

// Types
import {
  IGlobalSettings,
  IGlobalSettingsDoc,
  IGlobalSettingsModel,
} from './types';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Create a Global Setting's Document and Save it to Database
 *
 * @param {IGlobalSettingsModel} this - Global Setting's Model
 * @param {IGlobalSettings} doc - Global Setting's Doc to be Created and Saved
 * @returns {Promise<IGlobalSettingsDoc>} - Promise Returning Saved Document
 */
export function createDoc(
  this: IGlobalSettingsModel,
  doc: IGlobalSettings,
): Promise<IGlobalSettingsDoc> {
  return createDocument<
    IGlobalSettings,
    IGlobalSettingsDoc,
    IGlobalSettingsModel
  >(this, doc);
}

/**
 * Clears the Global Setting's Collection by Deleting all the Records
 *
 * @param {IGlobalSettingsModel} this - Global Setting's Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(
  this: IGlobalSettingsModel,
): Promise<IInlineResponse<string>> {
  return clearCollection<IGlobalSettingsDoc, IGlobalSettingsModel>(this);
}
