// API
import api from '@google/api/drive/drives/API';

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
 * Updates Details about a Shared Drive
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @param {string} driveId - The ID of the Shared Drive
 * @param {Partial<IDriveResourceDetails>} drivePatchData - Drive Data to be Updated
 * @returns {Promise<IGoogleResponse<IDriveResourceType>>} - Promise Resolving to Details
 */
export default function (
  token: ITokenDoc,
  driveId: string,
  drivePatchData: Partial<IDriveResourceDetails>,
): Promise<IGoogleResponse<IDriveResourceType>> {
  const params = {
    fields: constructFields(fields),
  };
  const url = api.update(driveId);
  return googleApiRequest.patch<
    TDriveUrlType,
    Partial<IDriveResourceDetails>,
    IDriveResourceType
  >(url, token, drivePatchData, params);
}
