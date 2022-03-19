// API
import api from '@plugins/google/api/drive/files/API';

// Google Request Method
import { googleApiRequest } from '@plugins/google/helpers';

// Types
import type { ITokenDoc } from '@models/types';
import type { IGoogleResponse } from '@plugins/google/helpers/types';
import type { TDriveUrlType } from '@plugins/google/api/drive/types';

/**
 * Deletes a File in Google Drive
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @param {string} fileId - ID of the Folder or File
 * @returns {Promise<IGoogleResponse>} - Promise
 */
export default function (
  token: ITokenDoc,
  fileId: string,
): Promise<IGoogleResponse> {
  const params = {
    supportsAllDrives: true,
  };
  const apiUrl = api.delete(fileId);
  return googleApiRequest.delete<TDriveUrlType>(apiUrl, token, params);
}
