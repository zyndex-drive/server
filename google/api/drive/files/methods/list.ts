// API
import api from '@google/api/drive/files/API';

// Google Request Method
import { googleApiRequest } from '@google/helpers';

// Other Helpers
import fields from '@google/api/drive/files/fields';
import { constructFields } from '@google/helpers';

// Types
import type { ITokenDoc } from '@models/tokens/types';
import type { IGoogleResponse } from '@google/helpers/types';
import type { TDriveUrlType } from '@google/api/drive/types';
import type {
  IDriveFileResource,
  IDriveFileSearchDetails,
} from '@google/api/drive/files/types';

/**
 * Lists Files inside a Folder or Root in Google Drive
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @param {string} folderId - ID of the Folder or File
 * @param {IDriveFileSearchDetails} searchOptions - Additional Options to Search Drive
 * @returns {Promise<IGoogleResponse<IDriveFileResource>>} - Promise Resolving to File Resource
 */
export default function (
  token: ITokenDoc,
  folderId?: string,
  searchOptions?: IDriveFileSearchDetails,
): Promise<IGoogleResponse<IDriveFileResource>> {
  const searchId = folderId ? folderId : 'root';
  const params = {
    fields: constructFields(fields, 'files'),
    q: `'${searchId}' in parents`,
    ...searchOptions,
  };
  const apiUrl = api.list;
  return googleApiRequest.get<TDriveUrlType, IDriveFileResource>(
    apiUrl,
    token,
    params,
  );
}
