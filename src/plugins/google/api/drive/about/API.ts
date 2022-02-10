import type { TDriveUrlType } from '@plugins/google/api/drive/types';

/** API Routes for Getting Information about drives in Google Drive */
export default {
  /**
   * Google Drive API for Getting Details about a User & drive
   *
   * @module get
   * @param {string} driveId - The ID of the shared drive
   * @returns {TDriveUrlType} - API String for get Route
   */
  get: 'https://www.googleapis.com/drive/v3/about' as TDriveUrlType,
};
