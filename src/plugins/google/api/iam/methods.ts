import { methods as projectMethods } from './projects';
import { methods as serviceAccountMethods } from './service-account';

/**
 * IAM API Methods
 */
export default {
  projects: projectMethods,
  serviceAccount: serviceAccountMethods,
};
