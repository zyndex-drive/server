// API
import api from '@google/api/drive/permissions/API';

// Google Request Method
import { googleApiRequest } from '@google/helpers';

// Other Helpers
import fields from '@google/api/drive/permissions/fields';
import { constructFields } from '@google/helpers';

// Types
import type { ITokenDoc } from '@models/tokens/types';
import type { IGoogleResponse } from '@google/helpers/types';
import type { TDriveUrlType } from '@google/api/drive/types';
import type { IDrivePermissionResource } from '@google/api/drive/permissions/types';

/**
 * Lists all Permissions for a File / Folder / Shared Drive
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @param {string} fileId - ID of the File / Folder / Shared Drive
 * @param {string} permissionId - ID of the Permission
 * @returns {Promise<IGoogleResponse<IDrivePermissionResource>>} - Promise Resolving to Permissions
 */
export default function (
  token: ITokenDoc,
  fileId: string,
  permissionId: string,
): Promise<IGoogleResponse<IDrivePermissionResource>> {
  const params = {
    fields: constructFields(fields),
  };
  const url = api.get(fileId, permissionId);
  return googleApiRequest.get<TDriveUrlType, IDrivePermissionResource>(
    url,
    token,
    params,
  );
}
