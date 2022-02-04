// Axios
import { axios } from '@plugins';

// Others
import { api, createJwtToken } from '@plugins/google/helpers';

// Types
import type { IServiceAccLeanDoc } from '@models/types';
import type {
  IGoogTokenResponse,
  TGoogleApiScope,
} from '@plugins/google/helpers/types';

/**
 * Constructs Google Oauth Token Exchange URL for Service Account
 *
 * @param {string} jwtSignature - Service Account JWT Signature
 * @returns {object} - Google Oauth Endpoint url with params
 */
function constructTokenRequestURL(jwtSignature: string): {
  url: string;
  params: string;
} {
  const url = api.generateToken;
  const encodedGrantType = encodeURIComponent(
    'urn:ietf:params:oauth:grant-type:jwt-bearer',
  );
  const params = `grant_type=${encodedGrantType}&assertion=${jwtSignature}`;
  return { url, params };
}

/**
 * Requests a Token Response from Google Servers for Generating Access Token for Service Account
 *
 * @async
 * @param {IServiceAccLeanDoc} account - Service Account Document from Database
 * @param {TGoogleApiScope[]} scopes - Google Oauth API Scopes
 * @returns {Promise<IGoogTokenResponse>} - Returns Token Response
 */
async function tokenRequest<TokenType>(
  account: IServiceAccLeanDoc,
  scopes: TGoogleApiScope[],
): Promise<TokenType> {
  const jwtSignature = await createJwtToken(account, scopes);
  const { url, params } = constructTokenRequestURL(jwtSignature);
  const response = await axios.post<TokenType>(url, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('Error While Generating the Tokens');
  }
}

/**
 * Generates a Access Token for Service Account
 *
 * @param {IServiceAccLeanDoc} account - Service Account Document from Database
 * @param {TGoogleApiScope[]} scopes - Google Oauth API Scopes
 * @returns {Promise<IGoogTokenResponse>} - Access Token Response
 */
export function generateAccessToken(
  account: IServiceAccLeanDoc,
  scopes: TGoogleApiScope[],
): Promise<IGoogTokenResponse> {
  return tokenRequest<IGoogTokenResponse>(account, scopes);
}
