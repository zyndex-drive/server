// API
import api from '@google/api/drive/drives/API';

// Google Request Method
import { googleApiRequest } from '@google/helpers';

// Types
import type { ITokenDoc } from '@models/tokens/types';
import type { IGoogleResponse } from '@google/helpers/types';
import type { TDriveUrlType } from '@google/api/drive/types';

/**
 * Lists all Shared Drives in the Respective Account
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @param {string} pageToken - Drive API pagination token (optional)
 * @param {string} q - Search String (optional)
 * @returns {Promise<IGoogleResponse>} - Promise Resolving to Drives List
 */
export default function (
  token: ITokenDoc,
  pageToken?: string,
  q?: string,
): Promise<IGoogleResponse> {
  const params = {
    pageSize: 20,
    pageToken: pageToken ? pageToken : '',
    q: q ? q : '',
  };
  return googleApiRequest.get<TDriveUrlType>(api.list, token, params);
}
