// API
import api from '@google/api/drive/permissions/API';

// Google Request Method
import { googleApiRequest } from '@google/helpers';

// Types
import type { ITokenDoc } from '@models/tokens/types';
import type { IGoogleResponse } from '@google/helpers/types';
import type { TDriveUrlType } from '@google/api/drive/types';

/**
 * Deletes a Permissions for a File / Folder / Shared Drive
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @param {string} fileId - ID of the File / Folder / Shared Drive
 * @param {string} permissionId - ID of the Permission
 * @returns {Promise<IGoogleResponse>} - Promise Resolving to void
 */
export default function (
  token: ITokenDoc,
  fileId: string,
  permissionId: string,
): Promise<IGoogleResponse> {
  const params = {
    fields: 'id,type,emailAddress,role,domain,photoLink,permissionDetails',
  };
  const url = api.delete(fileId, permissionId);
  return googleApiRequest.delete<TDriveUrlType>(url, token, params);
}
