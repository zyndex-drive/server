// API
import api from '@google/api/drive/drives/API';

// UUID
import { v4 as uuidv4 } from 'uuid';

// Google Request Method
import { googleApiRequest } from '@google/helpers';

// Other Helpers
import fields from '@google/api/drive/drives/fields';
import { constructFields } from '@google/helpers';

// Types
import type { ITokenDoc } from '@models/tokens/types';
import type { IGoogleResponse } from '@google/helpers/types';
import type { TDriveUrlType } from '@google/api/drive/types';
import type {
  IDriveResourceDetails,
  IDriveResourceType,
} from '@google/api/drive/drives/types';

/**
 * Gets Details about a Shared Drive
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @param {IDriveResourceType} driveResource - Details for Creating Shared Drive
 * @returns {Promise<IGoogleResponse<IDriveResourceType>>} - Promise Resolving to Details
 */
export default function (
  token: ITokenDoc,
  driveResource: IDriveResourceDetails,
): Promise<IGoogleResponse<IDriveResourceType>> {
  const requestId = uuidv4();
  const params = {
    requestId,
    fields: constructFields(fields),
  };
  const apiUrl = api.create;
  return googleApiRequest.post<
    TDriveUrlType,
    IDriveResourceDetails,
    IDriveResourceType
  >(apiUrl, token, driveResource, params);
}
