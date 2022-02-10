// API
import api from '@plugins/google/api/drive/files/API';

// Google Request Method
import { googleApiRequest } from '@plugins/google/helpers';

// Other Helpers
import fields from '@plugins/google/api/drive/files/fields';
import { constructFields } from '@plugins/google/helpers';

// Types
import type { ITokenDoc } from '@models/types';
import type { IGoogleResponse } from '@plugins/google/helpers/types';
import type { TDriveUrlType } from '@plugins/google/api/drive/types';
import type {
  IDriveFileResource,
  IDriveFileSearchDetails,
} from '@plugins/google/api/drive/files/types';

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
    supportsAllDrives: true,
    ...searchOptions,
  };
  const apiUrl = api.list;
  return googleApiRequest.get<TDriveUrlType, IDriveFileResource>(
    apiUrl,
    token,
    params,
  );
}
