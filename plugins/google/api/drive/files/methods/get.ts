// API
import api from '@plugins/google/api/drive/files/API';

// Google Request Method
import { googleApiRequest } from '@plugins/google/helpers';

// Other Helpers
import fields from '@plugins/google/api/drive/files/fields';
import { constructFields } from '@plugins/google/helpers';

// Types
import type { ITokenDoc } from '@models/tokens/types';
import type { IGoogleResponse } from '@plugins/google/helpers/types';
import type { TDriveUrlType } from '@plugins/google/api/drive/types';
import type { IDriveFileResource } from '@plugins/google/api/drive/files/types';

/**
 * Gets Details about a File in Google Drive
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @param {string} fileId - ID of the Folder or File
 * @returns {Promise<IGoogleResponse<IDriveFileResource>>} - Promise Resolving to File Resource
 */
export default function (
  token: ITokenDoc,
  fileId: string,
): Promise<IGoogleResponse<IDriveFileResource>> {
  const params = {
    fields: constructFields(fields),
    supportsAllDrives: true,
  };
  const apiUrl = api.get(fileId);
  return googleApiRequest.get<TDriveUrlType, IDriveFileResource>(
    apiUrl,
    token,
    params,
  );
}
