// API
import api from '@google/api/drive/files/API';

// Google Request Method
import { googleApiRequest } from '@google/helpers';

// Types
import type { GotReturn } from 'got';
import type { ITokenDoc } from '@models/tokens/types';
import type { TDriveUrlType } from '@google/api/drive/types';

/**
 * Downloads a File from Drive using Streaming Request
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @param {string} fileId - ID of the Folder or File
 * @returns {GotReturn} - Promise Resolving to File Data
 */
export default function (token: ITokenDoc, fileId: string): GotReturn {
  const apiUrl = api.get(fileId);
  const params = {
    alt: 'media',
  };
  return googleApiRequest.stream<TDriveUrlType>(apiUrl, token, params);
}
