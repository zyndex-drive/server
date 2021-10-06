// API
import api from '@google/api/drive/permissions/API';

// Google Request Method
import { googleApiRequest } from '@google/helpers';

// Types
import type { ITokenDoc } from '@models/tokens/types';
import type { IGoogleResponse } from '@google/helpers/types';
import type { TDriveUrlType } from '@google/api/drive/types';
import type { IDrivePermissionResource } from '@google/api/drive/permissions/types';

// Custom Types

interface IPermissionsList {
  kind: 'drive#permissionList';
  nextPageToken?: string;
  drives: IDrivePermissionResource[];
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
    fields: 'id,type,emailAddress,role,domain,photoLink,permissionDetails',
  };
  const url = api.list(fileId);
  return googleApiRequest.get<TDriveUrlType, IPermissionsList>(
    url,
    token,
    params,
  );
}
