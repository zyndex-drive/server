// API
import api from '@google/api/drive/files/API';

// Google Request Method
import { googleApiRequest } from '@google/helpers';

// Other Helpers
import queryHandler from '../handle-query';
import fields from '@google/api/drive/files/fields';
import { constructFields } from '@google/helpers';

// Types
import type { ITokenDoc } from '@models/tokens/types';
import type { IGoogleResponse } from '@google/helpers/types';
import type { TDriveUrlType } from '@google/api/drive/types';
import type {
  IDriveFileResource,
  IDriveFileSearchDetails,
  IDriveFileAdvancedQuery,
} from '@google/api/drive/files/types';

/**
 * Search Files & Folders in Google Drive
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @param {string} folderId - ID of the Folder or File
 * @param {boolean} scopeCurrentFolder - Restrict Search to Current Folder or not
 * @param {IDriveFileSearchDetails} searchOptions - Additional Options to Search Drive
 * @param {IDriveFileAdvancedQuery} advancedSearchOptions - Advanced Search Options to Filter
 * @returns {Promise<IGoogleResponse<IDriveFileResource>>} - Promise Resolving to List of Files
 */
export default function (
  token: ITokenDoc,
  folderId?: string,
  scopeCurrentFolder?: boolean,
  searchOptions?: IDriveFileSearchDetails,
  advancedSearchOptions?: IDriveFileAdvancedQuery,
): Promise<IGoogleResponse<IDriveFileResource>> {
  let query = '';
  const searchId = folderId ? folderId : 'root';
  if (scopeCurrentFolder && advancedSearchOptions) {
    query += `'${searchId}' in parents and `;
    query += `${queryHandler(advancedSearchOptions)}`;
  } else if (scopeCurrentFolder) {
    query += `'${searchId}' in parents`;
  } else if (advancedSearchOptions) {
    query += `${queryHandler(advancedSearchOptions)}`;
  }
  const params = {
    fields: constructFields(fields, 'files'),
    q: query,
    ...searchOptions,
  };
  const apiUrl = api.list;
  return googleApiRequest.get<TDriveUrlType, IDriveFileResource>(
    apiUrl,
    token,
    params,
  );
}
