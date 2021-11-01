// API
import api from '@plugins/google/api/iam/service-account/API';

// Google Request Method
import { googleApiRequest } from '@plugins/google/helpers';

// Types
import type { ITokenDoc } from '@models/tokens/types';
import type { IGoogleResponse } from '@plugins/google/helpers/types';
import type { TIAMApiUrlType } from '@plugins/google/api/iam/service-account/types';

/**
 * Enables a Service Account if it is Disabled
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @param {string} projectID - Project ID to which service accounts are to be fetched
 * @param {string} serviceAccEmail - Unique Email or ID of Service Account
 * @returns {Promise<IGoogleResponse>} - Promise Resolving to Response of the Request
 */
export default function (
  token: ITokenDoc,
  projectID: string,
  serviceAccEmail: string,
): Promise<IGoogleResponse> {
  const apiUrl = api.enable(projectID, serviceAccEmail);
  return googleApiRequest.post<TIAMApiUrlType>(apiUrl, token);
}
