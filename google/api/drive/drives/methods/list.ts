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
import type { IDriveResourceType } from '@google/api/drive/drives/types';

// Custom Types

interface IDrivesList {
  kind: 'drive#driveList';
  nextPageToken?: string;
  drives: IDriveResourceType[];
}

/**
 * Lists all Shared Drives in the Respective Account
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @param {string} pageToken - Drive API pagination token (optional)
 * @param {string} q - Search String (optional)
 * @returns {Promise<IGoogleResponse>} - Promise Resolving to Drives List
 */
export default function (
  token: ITokenDoc,
  pageToken?: string,
  q?: string,
): Promise<IGoogleResponse<IDrivesList>> {
  const params = {
    fields: constructFields(fields, 'drives'),
    pageToken: pageToken ? pageToken : '',
    q: q ? q : '',
  };
  return googleApiRequest.get<TDriveUrlType, IDrivesList>(
    api.list,
    token,
    params,
  );
}
