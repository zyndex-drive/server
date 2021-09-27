import { api as filesApi } from './files';
import { api as drivesApi } from './drives';

/**
 * Google Drive API Routes
 */
export default {
  files: filesApi,
  drives: drivesApi,
};
