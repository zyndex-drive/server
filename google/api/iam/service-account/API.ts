/** API Routes for Managing Google IAM - Service Accounts */
export default {
  /**
   * IAM API for Creating Service Account
   *
   * @module create
   * @param {string} projectID - Resource Name of the Project Associated with the Service Accounts
   * @returns {string} - API String for Create Route
   */
  create: (projectID: string): string =>
    `https://iam.googleapis.com/v1/projects/${projectID}/serviceAccounts`,

  /**
   * IAM API for Deleting Service Account
   *
   * @module delete
   * @param {string} projectID - Resource Name of the Project Associated with the Service Accounts
   * @param {string} account - Unique email of Service Account
   * @returns {string} - API String for Delete Route
   */
  delete: (projectID: string, account: string): string =>
    `https://iam.googleapis.com/v1/projects/${projectID}/serviceAccounts/${account}`,

  /**
   * IAM API for Disabling Service Account
   *
   * @module disable
   * @param {string} projectID - Resource Name of the Project Associated with the Service Accounts
   * @param {string} account - Unique email of Service Account
   * @returns {string} - API String for disable Route
   */
  disable: (projectID: string, account: string): string =>
    `https://iam.googleapis.com/v1/projects/${projectID}/serviceAccounts/${account}:disable`,

  /**
   * IAM API for Enabling Service Account
   *
   * @module enable
   * @param {string} projectID - Resource Name of the Project Associated with the Service Accounts
   * @param {string} account - Unique email of Service Account
   * @returns {string} - API String for enable Route
   */
  enable: (projectID: string, account: string): string =>
    `https://iam.googleapis.com/v1/projects/${projectID}/serviceAccounts/${account}:enable`,

  /**
   * IAM API for Getting Details about Service Account
   *
   * @module get
   * @param {string} projectID - Resource Name of the Project Associated with the Service Accounts
   * @param {string} account - Unique email of Service Account
   * @returns {string} - API String for get Route
   */
  get: (projectID: string, account: string): string =>
    `https://iam.googleapis.com/v1/projects/${projectID}/serviceAccounts/${account}`,

  /**
   * IAM API for Listing Service Accounts
   *
   * @module list
   * @param {string} projectID - Resource Name of the Project Associated with the Service Accounts
   * @returns {string} - API String for list Route
   */
  list: (projectID: string): string =>
    `https://iam.googleapis.com/v1/projects/${projectID}/serviceAccounts`,
};
