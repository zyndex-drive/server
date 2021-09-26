import { api as projectsApi } from './projects';
import { api as serviceAccountApi } from './service-account';

/**
 * Google IAM API Routes
 */
export const api = {
  projects: projectsApi,
  serviceAccount: serviceAccountApi,
};
