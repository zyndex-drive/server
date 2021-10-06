// API
import api from '@google/api/drive/permissions/API';

// Google Request Method
import { googleApiRequest } from '@google/helpers';

// Types
import type { ITokenDoc } from '@models/tokens/types';
import type { IGoogleResponse } from '@google/helpers/types';
import type { TDriveUrlType } from '@google/api/drive/types';
import type {
  IDrivePermissionDetails,
  IDrivePermissionResource,
} from '@google/api/drive/permissions/types';

/**
 * Lists all Permissions for a File / Folder / Shared Drive
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @param {string} fileId - ID of the File / Folder / Shared Drive
 * @param {IDrivePermissionDetails} permissionDetails - Details of the Permission
 * @returns {Promise<IGoogleResponse<IDrivePermissionResource>>} - Promise Resolving to Created Permission Resource
 */
export default function (
  token: ITokenDoc,
  fileId: string,
  permissionDetails: IDrivePermissionDetails,
): Promise<IGoogleResponse<IDrivePermissionResource>> {
  const params = {
    fields: 'id,type,emailAddress,role,domain,photoLink,permissionDetails',
  };
  const url = api.create(fileId);
  return googleApiRequest.post<
    TDriveUrlType,
    IDrivePermissionDetails,
    IDrivePermissionResource
  >(url, token, permissionDetails, params);
}
