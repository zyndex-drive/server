import type { TIAMApiUrlType } from '@plugins/google/api/iam/service-account/types';

/** API Routes for Managing Google IAM - Service Accounts */
export default {
  /**
   * IAM API for Creating Service Account
   *
   * @module create
   * @param {string} projectID - Resource Name of the Project Associated with the Service Accounts
   * @returns {TIAMApiUrlType} - API String for Create Route
   */
  create: (projectID: string): TIAMApiUrlType =>
    `https://iam.googleapis.com/v1/projects/${projectID}/serviceAccounts`,

  /**
   * IAM API for Deleting Service Account
   *
   * @module delete
   * @param {string} projectID - Resource Name of the Project Associated with the Service Accounts
   * @param {string} account - Unique email of Service Account
   * @returns {TIAMApiUrlType} - API String for Delete Route
   */
  delete: (projectID: string, account: string): TIAMApiUrlType =>
    `https://iam.googleapis.com/v1/projects/${projectID}/serviceAccounts/${account}`,

  /**
   * IAM API for Disabling Service Account
   *
   * @module disable
   * @param {string} projectID - Resource Name of the Project Associated with the Service Accounts
   * @param {string} account - Unique email of Service Account
   * @returns {TIAMApiUrlType} - API String for disable Route
   */
  disable: (projectID: string, account: string): TIAMApiUrlType =>
    `https://iam.googleapis.com/v1/projects/${projectID}/serviceAccounts/${account}:disable`,

  /**
   * IAM API for Enabling Service Account
   *
   * @module enable
   * @param {string} projectID - Resource Name of the Project Associated with the Service Accounts
   * @param {string} account - Unique email of Service Account
   * @returns {TIAMApiUrlType} - API String for enable Route
   */
  enable: (projectID: string, account: string): TIAMApiUrlType =>
    `https://iam.googleapis.com/v1/projects/${projectID}/serviceAccounts/${account}:enable`,

  /**
   * IAM API for Getting Details about Service Account
   *
   * @module get
   * @param {string} projectID - Resource Name of the Project Associated with the Service Accounts
   * @param {string} account - Unique email of Service Account
   * @returns {TIAMApiUrlType} - API String for get Route
   */
  get: (projectID: string, account: string): TIAMApiUrlType =>
    `https://iam.googleapis.com/v1/projects/${projectID}/serviceAccounts/${account}`,

  /**
   * IAM API for Listing Service Accounts
   *
   * @module list
   * @param {string} projectID - Resource Name of the Project Associated with the Service Accounts
   * @returns {TIAMApiUrlType} - API String for list Route
   */
  list: (projectID: string): TIAMApiUrlType =>
    `https://iam.googleapis.com/v1/projects/${projectID}/serviceAccounts`,
};
