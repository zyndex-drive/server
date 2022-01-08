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
import type { IDrivePermissionResource } from '@plugins/google/api/drive/permissions/types';

// Custom Types

interface IPermissionsList {
  kind: 'drive#permissionList';
  nextPageToken?: string;
  permissions: IDrivePermissionResource[];
}

/**
 * Lists all Permissions for a File / Folder / Shared Drive
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @param {string} fileId - The ID of the File / Folder / Shared Drive
 * @returns {Promise<IGoogleResponse<IPermissionsList>>} - Promise Resolving to Permissions List
 */
export default function (
  token: ITokenDoc,
  fileId: string,
): Promise<IGoogleResponse<IPermissionsList>> {
  const params = {
    fields: constructFields(fields, 'permissions'),
  };
  const url = api.list(fileId);
  return googleApiRequest.get<TDriveUrlType, IPermissionsList>(
    url,
    token,
    params,
  );
}
