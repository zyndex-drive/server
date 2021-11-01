import type { TDriveUrlType } from '../types';

/** API Routes for Managing Permissions in Google Drive */
export default {
  /**
   * Google Drive API for Listing Permissions for a File or Shared Drive
   *
   * @module list
   * @param {string} fileId - The ID of the shared drive / Folder
   * @returns {TDriveUrlType} - API String for list route
   */
  list: (fileId: string): TDriveUrlType =>
    `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`,

  /**
   * Google Drive API for Getting all Permissions for a File or Shared Drive
   *
   * @module get
   * @param {string} fileId - The ID of the File / Folder / shared drive
   * @param {string} permissionId - The ID of the Permission
   * @returns {TDriveUrlType} - API String for get Route
   */

  get: (fileId: string, permissionId: string): TDriveUrlType =>
    `https://www.googleapis.com/drive/v3/files/${fileId}/permissions/${permissionId}`,

  /**
   * Google Drive API for Creating Permissions for a File or Shared Drive
   *
   * @module create
   * @param {string} fileId - The ID of the File / Folder / shared drive
   * @returns {TDriveUrlType} - API String for create route
   */
  create: (fileId: string): TDriveUrlType =>
    `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`,

  /**
   * Google Drive API for Deleting Permissions for a File or Shared Drive
   *
   * @module update
   * @param {string} fileId - The ID of the shared drive
   * @param {string} permissionId - The ID of the Permission
   * @returns {TDriveUrlType} - API String for delete route
   */
  delete: (fileId: string, permissionId: string): TDriveUrlType =>
    `https://www.googleapis.com/drive/v3/files/${fileId}/permissions/${permissionId}`,

  /**
   * Google Drive API for Updating Permissions for a File or Shared Drive
   *
   * @module update
   * @param {string} fileId - The ID of the shared drive
   * @param {string} permissionId - The ID of the Permission
   * @returns {TDriveUrlType} - API String for update route
   */
  update: (fileId: string, permissionId: string): TDriveUrlType =>
    `https://www.googleapis.com/drive/v3/files/${fileId}/permissions/${permissionId}`,
};
