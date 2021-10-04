// API
import api from '@google/api/drive/drives/API';

// Google Request Method
import { googleApiRequest } from '@google/helpers';

// Types
import type { ITokenDoc } from '@models/tokens/types';
import type { IGoogleResponse } from '@google/helpers/types';
import type { TDriveUrlType } from '@google/api/drive/types';

/**
 * Gets Details about a Shared Drive
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @param {string} driveId - The ID of the Shared Drive
 * @returns {Promise<IGoogleResponse>} - Promise Resolving to Details
 */
export default function (
  token: ITokenDoc,
  driveId: string,
): Promise<IGoogleResponse> {
  return googleApiRequest.get<TDriveUrlType>(api.get(driveId), token);
}
