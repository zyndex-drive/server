import type { TDriveUrlType } from '../types';

/** API Routes for Managing Drives in Google Drive */
export default {
  /**
   * Google Drive API for Listing Drives in the Account
   *
   * @module list
   * @returns {TDriveUrlType} - API String for list route
   */
  list: 'https://www.googleapis.com/drive/v3/drives' as TDriveUrlType,

  /**
   * Google Drive API for Getting Details about a drive
   *
   * @module get
   * @param {string} driveId - The ID of the shared drive
   * @returns {TDriveUrlType} - API String for get Route
   */
  get: (driveId: string): TDriveUrlType =>
    `https://www.googleapis.com/drive/v3/drives/${driveId}`,

  /**
   * Google Drive API for Creating a Shared Drive
   *
   * @module create
   * @returns {TDriveUrlType} - API String for create route
   */
  create: 'https://www.googleapis.com/drive/v3/drives' as TDriveUrlType,

  /**
   * Google Drive API for Updating Details a Shared Drive
   *
   * @module update
   * @param {string} driveId - The ID of the shared drive
   * @returns {TDriveUrlType} - API String for update route
   */
  update: (driveId: string): TDriveUrlType =>
    `https://www.googleapis.com/drive/v3/drives/${driveId}`,
};
