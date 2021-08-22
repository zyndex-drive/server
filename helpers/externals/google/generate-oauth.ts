// Models
import { Tokens, Credentials } from '@models';

// Others
import api from './api';
import { objectID } from '@helpers/uid';
import { generateRefreshToken, generateAccessToken } from './generate-token';
import stringizeScopes from './stringize-scope';

// Response Handlers
import { okResponse } from '@helpers/express/response-handlers/2XX-response';
import { notFound } from '@helpers/express/response-handlers/4XX-response';
import { internalServerError } from '@helpers/express/response-handlers/5XX-response';

// Types
import type { Request, Response } from 'express';
import type { Error as MongoError } from 'mongoose';
import type { ICredentialsDoc } from '@models/credential/types';
import type { IToken, ITokenDoc } from '@models/tokens/types';
import type { IGoogTokenResponse, TGooGScope } from './types';

/**
 * Constructs Google Oauth Authorization URL
 *
 * @param {ICredentialsDoc} credentials - Credentials Document from Database
 * @param {TGooGScope[]} scopes - Array of Google Oauth Scopes
 * @returns {string} - Google Oauth User Consent URL
 */
function constructOauthURL(
  credentials: ICredentialsDoc,
  scopes: TGooGScope[],
): string {
  const encodedClient_id = encodeURIComponent(credentials.client_id);
  const encodedRedirect_uri = encodeURIComponent(credentials.redirect_uri);
  const scopeParam = stringizeScopes(scopes);
  const encodedScope_param = encodeURIComponent(scopeParam);
  const params = `client_id=${encodedClient_id}&redirect_uri=${encodedRedirect_uri}&response_type=code&scope=${encodedScope_param}&access_type=offline`;
  return `${api.authorize}?${params}`;
}

/**
 * Redirect the User to the OAuth Authentication URL
 *
 * @param {Response} res - Express Response Object
 * @param {string} id - Credentials ID
 * @param {TGooGScope[]} scopes - Google API Scopes
 */
function redirectUser(res: Response, id: string, scopes: TGooGScope[]): void {
  Credentials.findById(id)
    .then((credentials: ICredentialsDoc | null) => {
      if (credentials) {
        const url = constructOauthURL(credentials, scopes);
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
 * @param {IGoogTokenResponse} refreshToken - Refresh Token Response
 * @param {IGoogTokenResponse} accessToken - Access Token Response
 * @returns {Promise<ITokenDoc[]>} - Saved Token Documents
 */
function handleTokenSaving(
  credentials: ICredentialsDoc,
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
            token: refreshToken.refresh_token,
            type: 'refresh',
            related_to: credentials._id,
            ref_model: 'Credential',
            expires_at: now + 100 * 365 * 24 * 3600 * 1000,
            website: 'google.com',
          },
          {
            _id: uid2,
            token: accessToken.access_token,
            type: 'access',
            related_to: credentials._id,
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
 * @param {TGooGScope[]} scopes - Google API Scopes
 */
function handleUserAuthorization(
  res: Response,
  id: string,
  code: string,
  scopes: TGooGScope[],
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
              refreshToken,
              accessToken,
            );
            okResponse<ITokenDoc[]>(res, savedDocs);
          } else {
            throw new Error('No Refresh Token Found in Response, Kindly Retry');
          }
        } catch (e) {
          console.log(e);
          internalServerError(res, 'Token Generation', e);
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
 * Generate Google Oauth Refresh Token and Authorization Token
 *
 * @param {Request} req - Express Request Object
 * @param {Response} res - Express Response Object
 * @param {string} id - Credentials ID
 * @param {TGooGScope[]} scopes - Google API Scopes
 */
export default function (
  req: Request,
  res: Response,
  id: string,
  scopes: TGooGScope[],
): void {
  const { code } = req.query;
  if (!code) {
    redirectUser(res, id, scopes);
  } else {
    const stringizedCode = String(code);
    handleUserAuthorization(res, id, stringizedCode, scopes);
  }
}
