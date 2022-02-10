import { api as filesApi } from './files';
import { api as drivesApi } from './drives';
import { api as aboutApi } from './about';
import { api as permissionsApi } from './permissions';

/**
 * Google Drive API Routes
 */
export default {
  files: filesApi,
  drives: drivesApi,
  about: aboutApi,
  permissions: permissionsApi,
};
