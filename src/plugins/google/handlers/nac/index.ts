import generateOauth from './generate-oauth';
import { generateAccessToken, generateRefreshToken } from './generate-token';
import revokeToken from './revoke-token';

/**
 * Google General Account Oauth Handlers
 */
export default {
  generateOauth,
  generateAccessToken,
  generateRefreshToken,
  revokeToken,
};
