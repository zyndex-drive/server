// API
import api from '@plugins/google/api/drive/about/API';

// Google Request Method
import { googleApiRequest } from '@plugins/google/helpers';

// Other Helpers
import fields from '@plugins/google/api/drive/about/fields';
import { constructFields } from '@plugins/google/helpers';

// Types
import type { ITokenDoc } from '@models/tokens/types';
import type { IGoogleResponse } from '@plugins/google/helpers/types';
import type { TDriveUrlType } from '@plugins/google/api/drive/types';
import type { IDriveAboutResource } from '@plugins/google/api/drive/about/types';

/**
 * Get all Details about User, Drive
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @returns {Promise<IGoogleResponse<IDriveAboutResource>>} - Promise Resolving to Details of User and Drives
 */
export default function (
  token: ITokenDoc,
): Promise<IGoogleResponse<IDriveAboutResource>> {
  const params = {
    fields: constructFields(fields),
  };
  return googleApiRequest.get<TDriveUrlType, IDriveAboutResource>(
    api.get,
    token,
    params,
  );
}
