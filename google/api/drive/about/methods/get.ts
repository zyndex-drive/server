// API
import api from '@google/api/drive/about/API';

// Google Request Method
import { googleApiRequest } from '@google/helpers';

// Other Helpers
import fields from '@google/api/drive/about/fields';
import { constructFields } from '@google/helpers';

// Types
import type { ITokenDoc } from '@models/tokens/types';
import type { IGoogleResponse } from '@google/helpers/types';
import type { TDriveUrlType } from '@google/api/drive/types';
import type { IDriveAboutResource } from '@google/api/drive/about/types';

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
