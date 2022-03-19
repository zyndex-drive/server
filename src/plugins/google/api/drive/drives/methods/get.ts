// API
import api from '@plugins/google/api/drive/drives/API';

// Google Request Method
import { googleApiRequest } from '@plugins/google/helpers';

// Other Helpers
import fields from '@plugins/google/api/drive/drives/fields';
import { constructFields } from '@plugins/google/helpers';

// Types
import type { ITokenDoc } from '@models/types';
import type { IGoogleResponse } from '@plugins/google/helpers/types';
import type { TDriveUrlType } from '@plugins/google/api/drive/types';
import type { IDriveResourceType } from '@plugins/google/api/drive/drives/types';

/**
 * Gets Details about a Shared Drive
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @param {string} driveId - The ID of the Shared Drive
 * @returns {Promise<IGoogleResponse<IDriveResourceType>>} - Promise Resolving to Details
 */
export default function (
  token: ITokenDoc,
  driveId: string,
): Promise<IGoogleResponse<IDriveResourceType>> {
  const params = {
    fields: constructFields(fields),
  };
  return googleApiRequest.get<TDriveUrlType, IDriveResourceType>(
    api.get(driveId),
    token,
    params,
  );
}
