import {
  resolveToken,
  stringizeScope,
  constructFields,
  createJwtToken,
  googleApiRequest,
} from './helpers';

export {
  api as oauthAuthenticationApis,
  mimeArray,
  mimeTypes,
} from './helpers';
export { api as oauthRouteApis } from './routes';
export { scopes as oauthScopes } from './api';

export { default as normalAccountHandler } from './handlers/nac';
export { default as serviceAccountHandler } from './handlers/sac';

export const oauthHelpers = {
  resolveToken,
  stringizeScope,
  constructFields,
  createJwtToken,
  googleApiRequest,
};
