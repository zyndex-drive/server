import {
  normalAccountHandler,
  serviceAccountHandler,
  oauthHelpers,
} from '@plugins/google';

import type { TGoogleApiScope } from '@plugins/google/helpers/types';
import type { IMailTokens } from './types';
import type { Request, Response } from 'express';
import { ITokenDoc, ICredentialsDoc } from '@models/types';

const gmailScopes: TGoogleApiScope[] = ['https://mail.google.com/'];

/**
 * Generate Refresh and Access Token for Google - GMAIL SMTP API using Normal Credentials
 *
 * @param {Request} req - Express Request Object
 * @param {Response} res - Express Response Object
 */
export function handleNormalAccount(req: Request, res: Response): void {
  normalAccountHandler.generateOauth(req, res, gmailScopes);
}

/**
 * Generate Refresh and Access Token for Google - GMAIL SMTP API using Service Account
 *
 * @param {string} serviceAcc - Service Account ID
 * @returns {Promise<ITokenDoc>} - Token Document
 */
export function handleServieAccount(serviceAcc: string): Promise<ITokenDoc> {
  return serviceAccountHandler.generateOauth(serviceAcc, gmailScopes);
}

/**
 * Retreives Tokens Related to the Particular Google Credentials
 *
 * @param {string} credentials - Credential Document from Database
 * @returns {Promise<IMailTokens>} - Tokens
 */
export async function retreiveTokens(
  credentials: ICredentialsDoc['_id'],
): Promise<IMailTokens> {
  const resolvedTokens = await oauthHelpers.resolveToken(
    credentials,
    gmailScopes,
    true,
  );
  const data = {
    credentials: resolvedTokens.credentials,
    tokens: {
      refresh: resolvedTokens.tokens.refresh,
      access: resolvedTokens.tokens.access,
    },
    service_account: resolvedTokens.service_account,
  };
  return data;
}
