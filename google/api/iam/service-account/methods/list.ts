// API
import api from '@google/api/iam/service-account/API';

// Google Request Method
import { googleApiRequest } from '@google/helpers';

// Types
import type { ITokenDoc } from '@models/tokens/types';
import type { IGoogleResponse } from '@google/helpers/types';
import type { TIAMApiUrlType } from '@google/api/iam/types';

/**
 * Lists all Service Tokens in Google Cloud Console
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @param {string} projectID - Project ID to which service accounts are to be fetched
 * @returns {Promise<IGoogleResponse>} - Promise Resolving to Service Accounts List
 */
export default function (
  token: ITokenDoc,
  projectID: string,
): Promise<IGoogleResponse> {
  return googleApiRequest.get<TIAMApiUrlType>(api.list(projectID), token);
}
