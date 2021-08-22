// Axios
import axios from '@helpers/axios';

// Others
import api from './api';

// Types
import type { AxiosError } from 'axios';
import type { ICredentialsDoc } from '@models/credential/types';
import type { IGoogTokenResponse } from './types';

/**
 * Constructs Google Oauth Token Exchange URL
 *
 * @param {ICredentialsDoc} credentials - Credentials Document from Database
 * @param {string} type - Type of Token to Generate (refresh_token or access_token)
 * @param {string} code - Authorization Code or Refresh Token
 * @param {string} scopes - Space Delimited Google Oauth Scopes
 * @returns {object} - Returns URL and Param in a Object
 */
function constructTokenRequestURL(
  credentials: ICredentialsDoc,
  type: string,
  code: string,
  scopes?: string,
): { url: string; params: string } {
  const url = api.generateToken;
  let params = '';
  const encoded_client_id = encodeURIComponent(credentials.client_id);
  const encoded_client_secret = encodeURIComponent(credentials.client_secret);
  const encoded_scopes = scopes ? encodeURIComponent(scopes) : '';
  const encoded_redirect_uri = encodeURIComponent(credentials.redirect_uri);
  if (type === 'access_token') {
    params += `client_id=${encoded_client_id}&client_secret=${encoded_client_secret}&refresh_token=${code}&grant_type=refresh_token`;
  } else {
    params += `client_id=${encoded_client_id}&client_secret=${encoded_client_secret}&code=${code}&scopes=${encoded_scopes}&redirect_uri=${encoded_redirect_uri}&grant_type=authorization_code`;
  }
  return { url, params };
}

/**
 * Requests a Token Response from Google Servers for Generating Access / Refresh Tokens
 *
 * @param {string} type - Type of Token to Generate (refresh_token or access_token)
 * @param {ICredentialsDoc} credentials - Credentials Doc from Database
 * @param {string} code - Authorization Code or Refresh Token
 * @param {string} scopes - Space Delimited Google API Scopes
 * @returns {Promise<IGoogTokenResponse>} - Returns Token Response
 */
function tokenRequest<TokenType>(
  type: string,
  credentials: ICredentialsDoc,
  code: string,
  scopes?: string,
): Promise<TokenType> {
  return new Promise<TokenType>((resolve, reject) => {
    const { url, params } = constructTokenRequestURL(
      credentials,
      type,
      code,
      scopes,
    );
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
  });
}

/**
 * Generates a Refresh token with Authorization code
 *
 * @param {ICredentialsDoc} credentials - Credentials Document from Database
 * @param {string} scopes - Space Delimited Google API Scopes
 * @param {string} code - Authorization Code Received after User Authorization
 * @returns {Promise<Required<IGoogTokenResponse>>} - Refresh Token Response
 */
export function generateRefreshToken(
  credentials: ICredentialsDoc,
  scopes: string,
  code: string,
): Promise<Required<IGoogTokenResponse>> {
  return tokenRequest<Required<IGoogTokenResponse>>(
    'refresh_token',
    credentials,
    code,
    scopes,
  );
}

/**
 * Generates a Access Token with Refresh Token
 *
 * @param {ICredentialsDoc} credentials - Credentials Document from Database
 * @param {string} code - Refresh Token
 * @returns {Promise<IGoogTokenResponse>} - Access Token Response
 */
export function generateAccessToken(
  credentials: ICredentialsDoc,
  code: string,
): Promise<IGoogTokenResponse> {
  return tokenRequest<IGoogTokenResponse>('access_token', credentials, code);
}
