// API
import api from '@google/api/iam/projects/API';

// Google Request Method
import { googleApiRequest } from '@google/helpers';

// Types
import type { ITokenDoc } from '@models/tokens/types';
import type { IGoogleResponse } from '@google/helpers/types';
import type { TCloudApiUrlType } from '@google/api/iam/types';

/**
 * Lists all Projects in Google Cloud Console
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @returns {Promise<IGoogleResponse>} - Promise Resolving to Projects List
 */
export default function (token: ITokenDoc): Promise<IGoogleResponse> {
  return googleApiRequest.get<TCloudApiUrlType>(api.list, token);
}
