// API
import api from '@plugins/google/api/iam/service-account/API';

// Google Request Method
import { googleApiRequest } from '@plugins/google/helpers';

// Types
import type { ITokenDoc } from '@models/types';
import type { IGoogleResponse } from '@plugins/google/helpers/types';
import type { TIAMApiUrlType } from '@plugins/google/api/iam/service-account/types';

/**
 * Deletes a Service Account in the Project
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @param {string} projectID - Project ID to which service accounts are to be fetched
 * @param {string} serviceAccEmail - Unique Email or ID of Service Account
 * @returns {Promise<IGoogleResponse>} - Promise Resolving to Deleted Response
 */
export default function (
  token: ITokenDoc,
  projectID: string,
  serviceAccEmail: string,
): Promise<IGoogleResponse> {
  const apiUrl = api.delete(projectID, serviceAccEmail);
  return googleApiRequest.delete<TIAMApiUrlType>(apiUrl, token);
}
