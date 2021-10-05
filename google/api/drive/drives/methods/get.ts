// API
import api from '@google/api/drive/drives/API';

// Google Request Method
import { googleApiRequest } from '@google/helpers';

// Types
import type { ITokenDoc } from '@models/tokens/types';
import type { IGoogleResponse } from '@google/helpers/types';
import type { TDriveUrlType } from '@google/api/drive/types';
import type { IDriveResourceType } from '@google/api/drive/drives/types';

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
    fields: 'name,id,capabilities,createdTime,hidden,restrictions',
  };
  return googleApiRequest.get<TDriveUrlType, IDriveResourceType>(
    api.get(driveId),
    token,
    params,
  );
}
