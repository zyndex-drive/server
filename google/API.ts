import { api as iamApi } from './api/iam';
import { api as driveApi } from './api/drive';

/**
 * Comprehensive Google Outh/Cloud API Routes
 */
export const api = {
  iam: iamApi,
  drives: driveApi,
};
