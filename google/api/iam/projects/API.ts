import type { TCloudApiUrlType } from '@google/api/iam/projects/types';

/** API Routes for Managing Google IAM - Projects in Google Cloud Console */
export default {
  /**
   * IAM API for Listing Projects in Google Cloud Console
   *
   * @module list
   * @returns {TCloudApiUrlType} - API String for list route
   */
  list: 'https://cloudresourcemanager.googleapis.com/v1/projects' as TCloudApiUrlType,

  /**
   * IAM API for Getting Details about a Project in Google Cloud Console
   *
   * @param {string} projectID - Resource Name of the Project
   * @returns {TCloudApiUrlType} - API String for get Route
   */
  get: (projectID: string): TCloudApiUrlType =>
    `https://cloudresourcemanager.googleapis.com/v1/projects/${projectID}`,
};
