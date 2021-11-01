// API
import api from '@plugins/google/api/drive/files/API';

// Google Request Method
import { googleApiRequest } from '@plugins/google/helpers';

// Types
import type { ITokenDoc } from '@models/tokens/types';
import type { IGoogleResponse } from '@plugins/google/helpers/types';
import type { TDriveUrlType } from '@plugins/google/api/drive/types';

// Custom Types

export interface IDriveIDResponse {
  kind: 'drive#generatedIds';
  space: string;
  ids: string[];
}

/**
 * Generate IDs for Uploading and Copying Files
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @returns {Promise<IGoogleResponse<IDriveIDResponse>>} - Promise Resolving to IDs
 */
export default function (
  token: ITokenDoc,
): Promise<IGoogleResponse<IDriveIDResponse>> {
  const params = {
    count: 5,
    space: 'drive',
    type: 'files',
  };
  const apiUrl = api.generateId;
  return googleApiRequest.get<TDriveUrlType, IDriveIDResponse>(
    apiUrl,
    token,
    params,
  );
}
