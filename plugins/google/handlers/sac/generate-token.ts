// Axios
import { axios } from '@plugins';

// Others
import { api, createJwtToken } from '@plugins/google/helpers';

// Types
import type { AxiosError } from 'axios';
import type { IServiceAccDoc } from '@models/types';
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
 * @param {IServiceAccDoc} account - Service Account Document from Database
 * @param {TGoogleApiScope[]} scopes - Google Oauth API Scopes
 * @returns {Promise<IGoogTokenResponse>} - Returns Token Response
 */
function tokenRequest<TokenType>(
  account: IServiceAccDoc,
  scopes: TGoogleApiScope[],
): Promise<TokenType> {
  return new Promise<TokenType>((resolve, reject) => {
    createJwtToken(account, scopes)
      .then((jwtSignature) => {
        const { url, params } = constructTokenRequestURL(jwtSignature);
        axios
          .post(url, params, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
          .then((response) => {
            if (response.status === 200) {
              resolve(response.data);
            } else {
              reject(new Error('Error While Generating the Tokens'));
            }
          })
          .catch((error: AxiosError) => {
            reject(new Error(`${error.name}: ${error.message}`));
          });
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });
}

/**
 * Generates a Access Token for Service Account
 *
 * @param {IServiceAccDoc} account - Service Account Document from Database
 * @param {TGoogleApiScope[]} scopes - Google Oauth API Scopes
 * @returns {Promise<IGoogTokenResponse>} - Access Token Response
 */
export function generateAccessToken(
  account: IServiceAccDoc,
  scopes: TGoogleApiScope[],
): Promise<IGoogTokenResponse> {
  return tokenRequest<IGoogTokenResponse>(account, scopes);
}
