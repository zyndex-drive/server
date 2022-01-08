// API
import api from '@plugins/google/api/drive/permissions/API';

// Google Request Method
import { googleApiRequest } from '@plugins/google/helpers';

// Other Helpers
import fields from '@plugins/google/api/drive/permissions/fields';
import { constructFields } from '@plugins/google/helpers';

// Types
import type { ITokenDoc } from '@models/types';
import type { IGoogleResponse } from '@plugins/google/helpers/types';
import type { TDriveUrlType } from '@plugins/google/api/drive/types';
import type {
  IDrivePermissionDetails,
  IDrivePermissionResource,
} from '@plugins/google/api/drive/permissions/types';

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
    fields: constructFields(fields),
  };
  const url = api.create(fileId);
  return googleApiRequest.post<
    TDriveUrlType,
    IDrivePermissionDetails,
    IDrivePermissionResource
  >(url, token, permissionDetails, params);
}
