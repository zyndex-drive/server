// API
import api from '@plugins/google/api/iam/service-account/API';

// Google Request Method
import { googleApiRequest } from '@plugins/google/helpers';

// Types
import type { ITokenDoc } from '@models/types';
import type { IGoogleResponse } from '@plugins/google/helpers/types';
import type {
  TIAMApiUrlType,
  IServiceAccountResource,
} from '@plugins/google/api/iam/service-account/types';

/**
 * Get all Details about a Service Account
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @param {string} projectID - Project ID to which service accounts are to be fetched
 * @param {string} serviceAccEmail - Unique Email or ID of Service Account
 * @returns {Promise<IGoogleResponse<IServiceAccountResource>>} - Promise Resolving to Details of Service Account
 */
export default function (
  token: ITokenDoc,
  projectID: string,
  serviceAccEmail: string,
): Promise<IGoogleResponse<IServiceAccountResource>> {
  return googleApiRequest.get<TIAMApiUrlType, IServiceAccountResource>(
    api.get(projectID, serviceAccEmail),
    token,
  );
}
