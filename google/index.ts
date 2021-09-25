import { resolveToken, stringizeScope } from './helpers';

export { api } from './helpers';

export { default as normalAccountHandler } from './handlers/nac';

export const oauthHelpers = {
  resolveToken,
  stringizeScope,
};
