// API
import api from '@google/api/iam/projects/API';

// Google Request Method
import { googleApiRequest } from '@google/helpers';

// Types
import type { ITokenDoc } from '@models/tokens/types';
import type { IGoogleResponse } from '@google/helpers/types';
import type {
  TCloudApiUrlType,
  ICloudProjectResource,
} from '@google/api/iam/projects/types';

// Custom Types

interface ICloudProjectList {
  projects: ICloudProjectResource[];
  nextPageToken?: string;
}

/**
 * Lists all Projects in Google Cloud Console
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @returns {Promise<IGoogleResponse<ICloudProjectList>>} - Promise Resolving to Projects List
 */
export default function (
  token: ITokenDoc,
): Promise<IGoogleResponse<ICloudProjectList>> {
  return googleApiRequest.get<TCloudApiUrlType, ICloudProjectList>(
    api.list,
    token,
  );
}
