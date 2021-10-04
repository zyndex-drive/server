// API
import api from '@google/api/drive/about/API';

// Google Request Method
import { googleApiRequest } from '@google/helpers';

// Types
import type { ITokenDoc } from '@models/tokens/types';
import type { IGoogleResponse } from '@google/helpers/types';
import type { TDriveUrlType } from '@google/api/drive/types';

/**
 * Get all Details about User, Drive
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @returns {Promise<IGoogleResponse>} - Promise Resolving to Details of User and Drives
 */
export default function (token: ITokenDoc): Promise<IGoogleResponse> {
  return googleApiRequest.get<TDriveUrlType>(api.get, token);
}
