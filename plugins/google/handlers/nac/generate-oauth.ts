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
import { okResponse, errorResponseHandler } from '@plugins/server/responses';

import {
  BadRequest,
  NotFound,
  InternalServerError,
} from '@plugins/errors';

// Types
import type { Request, Response } from 'express';
import type { Error as MongoError } from 'mongoose';
import type { IToken, ITokenDoc, ICredentialsLeanDoc } from '@models/types';
import type {
  IGoogTokenResponse,
  TGoogleApiScope,
} from '@plugins/google/helpers/types';

/**
 * Constructs Google Oauth Authorization URL
 *
 * @param {ICredentialsLeanDoc} credentials - Credentials Document from Database
 * @param {TGoogleApiScope[]} scopes - Array of Google Oauth Scopes
 * @param {string} state - State of the app to be passed
 * @returns {string} - Google Oauth User Consent URL
 */
function constructOauthURL(
  credentials: ICredentialsLeanDoc,
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
    .exec()
    .then((credentials) => {
      if (credentials) {
        const leanCredentials = credentials.toObject();
        const state = encrypt.str(String(leanCredentials._id));
        const url = constructOauthURL(leanCredentials, scopes, state);
        res.redirect(url);
      } else {
        throw new NotFound('Credential ID Not found in DB, Kindly Recheck');
      }
    })
    .catch((err: MongoError) => {
      throw new InternalServerError(err.message, err.name);
    });
}

/**
 * Saves the Refresh Token and Access Token in the Database for Long Term Use
 *
 * @param {ICredentialsLeanDoc} credentials - Credentials Document from Database
 * @param {TGoogleApiScope[]} scopes - Google Oauth API Scopes
 * @param {IGoogTokenResponse} refreshToken - Refresh Token Response
 * @param {IGoogTokenResponse} accessToken - Access Token Response
 * @returns {Promise<ITokenDoc[]>} - Saved Token Documents
 */
function handleTokenSaving(
  credentials: ICredentialsLeanDoc,
  scopes: TGoogleApiScope[],
  refreshToken: Required<IGoogTokenResponse>,
  accessToken: IGoogTokenResponse,
): Promise<ITokenDoc[]> {
  return new Promise<ITokenDoc[]>((resolve, reject) => {
    const now = Date.now();
    const [uid1, uid2] = [objectID('t'), objectID('t')];
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
      .then(resolve)
      .catch((error: MongoError) => {
        reject(new InternalServerError(error.message, error.name));
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
    .exec()
    .then(async (credentials) => {
      if (credentials) {
        const leanCredentials = credentials.toObject();
        const scopeParam = stringizeScopes(scopes);
        try {
          const refreshToken = await generateRefreshToken(
            leanCredentials,
            scopeParam,
            code,
          );
          if (refreshToken.refresh_token) {
            const accessToken = await generateAccessToken(
              leanCredentials,
              refreshToken.refresh_token,
            );
            const savedDocs = await handleTokenSaving(
              leanCredentials,
              scopes,
              refreshToken,
              accessToken,
            );
            okResponse(res, savedDocs);
          } else {
            throw new NotFound(
              'No Refresh Token Found in Response, Kindly Retry',
            );
          }
        } catch (e: unknown) {
          console.log(e);
          throw new InternalServerError(String(e), 'Token Generation');
        }
      } else {
        throw new NotFound('Credential ID Not found in DB, Kindly Recheck');
      }
    })
    .catch((err: MongoError) => {
      throw new InternalServerError(err.message, err.name);
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
  try {
    const { creds, code, state } = req.query;
    if (!code && creds) {
      redirectUser(res, String(creds), scopes);
    } else if (code && state) {
      const stringizedCode = String(code);
      const credID = decrypt.str(decodeURIComponent(String(state)));
      handleUserAuthorization(res, credID, stringizedCode, scopes);
    } else {
      throw new BadRequest('creds', 'Query Parameters');
    }
  } catch (e) {
    errorResponseHandler(res, e)
  }
}
