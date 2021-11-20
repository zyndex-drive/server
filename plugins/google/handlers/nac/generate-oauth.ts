// Models
import { Tokens, Credentials } from '@models';

// Others
import api from '@plugins/google/helpers/API';
import { objectID } from '@plugins/misc';
import { encrypt, decrypt } from '@plugins/crypto';
import {
  generateRefreshToken,
  generateAccessToken,
} from '@plugins/google/handlers/nac/generate-token';
import stringizeScopes from '@plugins/google/helpers/stringize-scope';

// Response Handlers
import {
  okResponse,
  badRequest,
  notFound,
  internalServerError,
} from '@/plugins/server/responses';

// Types
import type { Request, Response } from 'express';
import type { Error as MongoError } from 'mongoose';
import type { ICredentialsDoc } from '@models/credential/types';
import type { IToken, ITokenDoc } from '@models/tokens/types';
import type {
  IGoogTokenResponse,
  TGoogleApiScope,
} from '@plugins/google/helpers/types';

/**
 * Constructs Google Oauth Authorization URL
 *
 * @param {ICredentialsDoc} credentials - Credentials Document from Database
 * @param {TGoogleApiScope[]} scopes - Array of Google Oauth Scopes
 * @param {string} state - State of the app to be passed
 * @returns {string} - Google Oauth User Consent URL
 */
function constructOauthURL(
  credentials: ICredentialsDoc,
  scopes: TGoogleApiScope[],
  state: string,
): string {
  const encodedClient_id = encodeURIComponent(credentials.client_id);
  const encodedRedirect_uri = encodeURIComponent(credentials.redirect_uri);
  const encodedState = encodeURIComponent(state);
  const scopeParam = stringizeScopes(scopes);
  const encodedScope_param = encodeURIComponent(scopeParam);
  const params = `client_id=${encodedClient_id}&redirect_uri=${encodedRedirect_uri}&response_type=code&scope=${encodedScope_param}&access_type=offline&state=${encodedState}`;
  return `${api.authorize}?${params}`;
}

/**
 * Redirect the User to the OAuth Authentication URL
 *
 * @param {Response} res - Express Response Object
 * @param {string} id - Credentials ID
 * @param {TGoogleApiScope[]} scopes - Google API Scopes
 */
function redirectUser(
  res: Response,
  id: string,
  scopes: TGoogleApiScope[],
): void {
  Credentials.findById(id)
    .then((credentials: ICredentialsDoc | null) => {
      if (credentials) {
        const state = encrypt.str(String(credentials._id));
        const url = constructOauthURL(credentials, scopes, state);
        res.redirect(url);
      } else {
        notFound(res, 'Credential ID Not found in DB, Kindly Recheck');
      }
    })
    .catch((err: MongoError) => {
      internalServerError(res, err.name, err.message);
    });
}

/**
 * Saves the Refresh Token and Access Token in the Database for Long Term Use
 *
 * @param {ICredentialsDoc} credentials - Credentials Document from Database
 * @param {TGoogleApiScope[]} scopes - Google Oauth API Scopes
 * @param {IGoogTokenResponse} refreshToken - Refresh Token Response
 * @param {IGoogTokenResponse} accessToken - Access Token Response
 * @returns {Promise<ITokenDoc[]>} - Saved Token Documents
 */
function handleTokenSaving(
  credentials: ICredentialsDoc,
  scopes: TGoogleApiScope[],
  refreshToken: Required<IGoogTokenResponse>,
  accessToken: IGoogTokenResponse,
): Promise<ITokenDoc[]> {
  return new Promise<ITokenDoc[]>((resolve, reject) => {
    const now = Date.now();
    Promise.all([objectID('t'), objectID('t')])
      .then(([uid1, uid2]) => {
        const tokensArr: IToken[] = [
          {
            _id: uid1,
            token: encrypt.str(refreshToken.refresh_token),
            type: 'refresh',
            related_to: credentials._id,
            scopes,
            ref_model: 'Credential',
            expires_at: now + 100 * 365 * 24 * 3600 * 1000,
            website: 'google.com',
          },
          {
            _id: uid2,
            token: encrypt.str(accessToken.access_token),
            type: 'access',
            related_to: credentials._id,
            scopes,
            ref_model: 'Credential',
            expires_at: now + accessToken.expires_in * 1000,
            website: 'google.com',
          },
        ];
        Tokens.insertMany(tokensArr)
          .then((tokenDocs) => {
            resolve(tokenDocs);
          })
          .catch((error: MongoError) => {
            reject(new Error(`${error.name}: ${error.message}`));
          });
      })
      .catch((e) => {
        console.log(e);
        reject(new Error('Error Occured while Generating a UID'));
      });
  });
}

/**
 * Handle Token Generation after User Authorization from Google Oauth
 *
 * @param {Response} res - Express Response Object
 * @param {string} id - Credentials ID
 * @param {string} code - Authorization Code Received from Google Server
 * @param {TGoogleApiScope[]} scopes - Google API Scopes
 */
function handleUserAuthorization(
  res: Response,
  id: string,
  code: string,
  scopes: TGoogleApiScope[],
) {
  Credentials.findById(id)
    .then(async (credentials: ICredentialsDoc | null) => {
      if (credentials) {
        const scopeParam = stringizeScopes(scopes);
        try {
          const refreshToken = await generateRefreshToken(
            credentials,
            scopeParam,
            code,
          );
          if (refreshToken.refresh_token) {
            const accessToken = await generateAccessToken(
              credentials,
              refreshToken.refresh_token,
            );
            const savedDocs = await handleTokenSaving(
              credentials,
              scopes,
              refreshToken,
              accessToken,
            );
            okResponse<ITokenDoc[]>(res, savedDocs);
          } else {
            throw new Error('No Refresh Token Found in Response, Kindly Retry');
          }
        } catch (e: unknown) {
          console.log(e);
          internalServerError(res, 'Token Generation', String(e));
        }
      } else {
        notFound(res, 'Credential ID Not found in DB, Kindly Recheck');
      }
    })
    .catch((err: MongoError) => {
      internalServerError(res, err.name, err.message);
    });
}

/**
 * Express Handler for Generating Google Oauth Refresh Token and Authorization Token
 *
 * @param {Request} req - Express Request Object
 * @param {Response} res - Express Response Object
 * @param {TGoogleApiScope[]} scopes - Google API Scopes
 */
export default function (
  req: Request,
  res: Response,
  scopes: TGoogleApiScope[],
): void {
  const { creds, code, state } = req.query;
  console.log(code, creds, String(state));
  if (!code && creds) {
    redirectUser(res, String(creds), scopes);
  } else if (code && state) {
    const stringizedCode = String(code);
    const credID = decrypt.str(decodeURIComponent(String(state)));
    handleUserAuthorization(res, credID, stringizedCode, scopes);
  } else {
    badRequest(res, 'creds', 'Query Parameters');
  }
}
