/** API Routes for Managing Google IAM - Projects in Google Cloud Console */
export default {
  /**
   * IAM API for Listing Projects in Google Cloud Console
   *
   * @module list
   */
  list: 'https://cloudresourcemanager.googleapis.com/v1/projects',

  /**
   * IAM API for Getting Details about a Project in Google Cloud Console
   *
   * @param {string} projectID - Resource Name of the Project
   * @returns {string} - API String for get Route
   */
  get: (projectID: string): string =>
    `https://cloudresourcemanager.googleapis.com/v1/projects/${projectID}`,
};
