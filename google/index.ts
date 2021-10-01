import { resolveToken, stringizeScope } from './helpers';

export { api as oauthAuthenticationApis } from './helpers';
export { api as oauthRouteApis } from './API';

export { default as normalAccountHandler } from './handlers/nac';
export { default as serviceAccountHandler } from './handlers/sac';

export const oauthHelpers = {
  resolveToken,
  stringizeScope,
};
