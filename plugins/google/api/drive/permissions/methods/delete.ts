// API
import api from '@plugins/google/api/drive/permissions/API';

// Google Request Method
import { googleApiRequest } from '@plugins/google/helpers';

// Other Helpers
import fields from '@plugins/google/api/drive/permissions/fields';
import { constructFields } from '@plugins/google/helpers';

// Types
import type { ITokenDoc } from '@models/tokens/types';
import type { IGoogleResponse } from '@plugins/google/helpers/types';
import type { TDriveUrlType } from '@plugins/google/api/drive/types';

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
    fields: constructFields(fields),
  };
  const url = api.delete(fileId, permissionId);
  return googleApiRequest.delete<TDriveUrlType>(url, token, params);
}
