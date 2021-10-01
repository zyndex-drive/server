// API
import api from '@google/api/drive/drives/API';

// Drive Request Method
import { driveRequest } from '@/google/api/drive/request';

// Types
import type { ITokenDoc } from '@models/tokens/types';
import type { IDriveResponse } from '@/google/api/drive/types';

/**
 * Lists all Shared Drives in the Respective Account
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @param {string} pageToken - Drive API pagination token (optional)
 * @param {string} q - Search String (optional)
 * @returns {Promise<IDriveResponse>} - Promise Resolving to Drives List
 */
export default function (
  token: ITokenDoc,
  pageToken?: string,
  q?: string,
): Promise<IDriveResponse> {
  const params = {
    pageSize: 20,
    pageToken: pageToken ? pageToken : '',
    q: q ? q : '',
  };
  return driveRequest.get(api.list, token, params);
}
