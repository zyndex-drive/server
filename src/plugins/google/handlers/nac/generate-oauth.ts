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

import { BadRequest, NotFound } from '@plugins/errors';

// Types
import type { Request, Response } from 'express';
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
  const [redirectUri] = credentials.redirect_uri.filter(
    (creds) => creds.type === 'other',
  );
  const encodedRedirect_uri = encodeURIComponent(redirectUri.uri);
  const encodedState = encodeURIComponent(state);
  const scopeParam = stringizeScopes(scopes);
  const encodedScope_param = encodeURIComponent(scopeParam);
  const params = `client_id=${encodedClient_id}&redirect_uri=${encodedRedirect_uri}&response_type=code&scope=${encodedScope_param}&access_type=offline&state=${encodedState}`;
  return `${api.authorize}?${params}`;
}

/**
 * Redirect the User to the OAuth Authentication URL
 *
 * @async
 * @param {Response} res - Express Response Object
 * @param {string} id - Credentials ID
 * @param {TGoogleApiScope[]} scopes - Google API Scopes
 */
async function redirectUser(
  res: Response,
  id: string,
  scopes: TGoogleApiScope[],
): Promise<void> {
  const credentials = await Credentials.findById(id).exec();
  if (credentials) {
    const leanCredentials = credentials.toObject();
    const state = encrypt.aes.str(String(leanCredentials._id));
    const url = constructOauthURL(leanCredentials, scopes, state);
    res.redirect(url);
  } else {
    throw new NotFound('Credential ID Not found in DB, Kindly Recheck');
  }
}

/**
 * Saves the Refresh Token and Access Token in the Database for Long Term Use
 *
 * @async
 * @param {ICredentialsLeanDoc} credentials - Credentials Document from Database
 * @param {TGoogleApiScope[]} scopes - Google Oauth API Scopes
 * @param {IGoogTokenResponse} refreshToken - Refresh Token Response
 * @param {IGoogTokenResponse} accessToken - Access Token Response
 * @returns {Promise<ITokenDoc[]>} - Saved Token Documents
 */
async function handleTokenSaving(
  credentials: ICredentialsLeanDoc,
  scopes: TGoogleApiScope[],
  refreshToken: Required<IGoogTokenResponse>,
  accessToken: IGoogTokenResponse,
): Promise<ITokenDoc[]> {
  const now = Date.now();
  const [uid1, uid2] = [objectID(), objectID()];
  const [encryptedRefresh, encryptedAccess] = [
    encrypt.aes.str(refreshToken.refresh_token),
    encrypt.aes.str(accessToken.access_token),
  ];
  const tokensArr: IToken[] = [
    {
      _id: uid1,
      token: encryptedRefresh,
      type: 'refresh',
      related_to: credentials._id,
      scopes,
      ref_model: 'Credential',
      expires_at: now + 100 * 365 * 24 * 3600 * 1000,
      website: 'google.com',
    },
    {
      _id: uid2,
      token: encryptedAccess,
      type: 'access',
      related_to: credentials._id,
      scopes,
      ref_model: 'Credential',
      expires_at: now + accessToken.expires_in * 1000,
      website: 'google.com',
    },
  ];
  const tokenDocs = await Tokens.insertMany(tokensArr);
  return tokenDocs;
}

/**
 * Handle Token Generation after User Authorization from Google Oauth
 *
 * @async
 * @param {Response} res - Express Response Object
 * @param {string} id - Credentials ID
 * @param {string} code - Authorization Code Received from Google Server
 * @param {TGoogleApiScope[]} scopes - Google API Scopes
 */
async function handleUserAuthorization(
  res: Response,
  id: string,
  code: string,
  scopes: TGoogleApiScope[],
): Promise<void> {
  const credentials = await Credentials.findById(id).exec();
  if (credentials) {
    const leanCredentials = credentials.toObject();
    const scopeParam = stringizeScopes(scopes);
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
      throw new NotFound('No Refresh Token Found in Response, Kindly Retry');
    }
  } else {
    throw new NotFound('Credential ID Not found in DB, Kindly Recheck');
  }
}

/**
 * Express Handler for Generating Google Oauth Refresh Token and Authorization Token
 *
 * @async
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
      void redirectUser(res, String(creds), scopes);
    } else if (code && state) {
      const stringizedCode = String(code);
      const credID = decrypt.aes.str(decodeURIComponent(String(state)));
      void handleUserAuthorization(res, credID, stringizedCode, scopes);
    } else {
      throw new BadRequest('creds', 'Query Parameters');
    }
  } catch (e) {
    errorResponseHandler(res, e);
  }
}
