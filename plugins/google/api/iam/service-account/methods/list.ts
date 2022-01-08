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

// Custom Types

interface IServiceAccountList {
  accounts: IServiceAccountResource[];
  nextPageToken: string;
}

/**
 * Lists all Service Tokens in Google Cloud Console
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @param {string} projectID - Project ID to which service accounts are to be fetched
 * @returns {Promise<IGoogleResponse<IServiceAccountList>>} - Promise Resolving to Service Accounts List
 */
export default function (
  token: ITokenDoc,
  projectID: string,
): Promise<IGoogleResponse<IServiceAccountList>> {
  return googleApiRequest.get<TIAMApiUrlType, IServiceAccountList>(
    api.list(projectID),
    token,
  );
}
