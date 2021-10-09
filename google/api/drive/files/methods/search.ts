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
  IDriveFileAdvancedSearch,
} from '@google/api/drive/files/types';

/**
 * Search Files & Folders in Google Drive
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @param {string} folderId - ID of the Folder or File
 * @param {IDriveFileSearchDetails} searchOptions - Additional Options to Search Drive
 * @param {IDriveFileAdvancedSearch} advancedSearchOptions - Advanced Search Options to Filter
 * @returns {Promise<IGoogleResponse<IDriveFileResource>>} - Promise Resolving to List of Files
 */
export default function (
  token: ITokenDoc,
  folderId?: string,
  searchOptions?: IDriveFileSearchDetails,
  advancedSearchOptions?: IDriveFileAdvancedSearch,
): Promise<IGoogleResponse<IDriveFileResource>> {
  let query = '';
  if (advancedSearchOptions) {
    query = ` and ${queryHandler(advancedSearchOptions)}`;
  } else {
    query = '';
  }
  const searchId = folderId ? folderId : 'root';
  const params = {
    fields: constructFields(fields, 'files'),
    q: `'${searchId}' in parents${query}`,
    ...searchOptions,
  };
  const apiUrl = api.list;
  return googleApiRequest.get<TDriveUrlType, IDriveFileResource>(
    apiUrl,
    token,
    params,
  );
}
