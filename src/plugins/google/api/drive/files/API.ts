import type { TDriveUrlType, TDriveUploadUrl } from '../types';

/** API Routes for Managing Files in Google Drive */
export default {
  /**
   * Google Drive API for Listing Files in Drive
   *
   * @module list
   * @returns {TDriveUrlType} - API String for list route
   */
  list: 'https://www.googleapis.com/drive/v3/files' as TDriveUrlType,

  /**
   * Google Drive API for Getting Details About a File
   *
   * @module get
   * @param {string} fileId - The ID o  f the file
   * @returns {TDriveUrlType} - API String for get Route
   */
  get: (fileId: string): TDriveUrlType =>
    `https://www.googleapis.com/drive/v3/files/${fileId}`,

  /**
   * Google Drive API for Uploading File
   *
   * @module create
   */
  create: {
    /**
     * Metadata Upload
     */
    metadata: 'https://www.googleapis.com/drive/v3/files' as TDriveUrlType,

    /**
     * File Upload
     */
    upload:
      'https://www.googleapis.com/upload/drive/v3/files' as TDriveUploadUrl,
  },

  /**
   * Google Drive API for Generating IDs for Uploading Files
   *
   * @module generateid
   * @returns {TDriveUrlType} - API String for generateid Route
   */
  generateId:
    'https://www.googleapis.com/drive/v3/files/generateIds' as TDriveUrlType,

  /**
   * Google Drive API for Deleting a File
   *
   * @module delete
   * @param {string} fileId - The ID of the file
   * @returns {TDriveUrlType} - API String for delete Route
   */
  delete: (fileId: string): TDriveUrlType =>
    `https://www.googleapis.com/drive/v3/files/${fileId}`,
};
