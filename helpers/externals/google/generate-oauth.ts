// Models
import { Credentials } from '@models';

// Others
import api from './endpoints';
import stringizeScopes from './stringize-scope';

// Response Handlers
import { notFound } from '@helpers/express/response-handlers/4XX-response';
import { internalServerError } from '@helpers/express/response-handlers/5XX-response';

// Types
import type { Request, Response } from 'express';
import type { Error as MongoError } from 'mongoose';
import type { ICredentials, ICredentialsDoc } from '@models/credential/types';
import type { TGooGScope } from './types';

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
  id: ICredentials['_id'],
  scopes: TGooGScope[],
): void {
  const code = req.query['params'];
  if (!code) {
    Credentials.findById(id)
      .then((credentials: ICredentialsDoc | null) => {
        if (credentials) {
          const encodedClient_id = encodeURIComponent(credentials.client_id);
          const encodedRedirect_uri = encodeURIComponent(
            credentials.redirect_uri,
          );
          const scopeParam = stringizeScopes(scopes);
          const encodedScope_param = encodeURIComponent(scopeParam);
          const params = `client_id=${encodedClient_id}&redirect_uri=${encodedRedirect_uri}&response_type=code&scope=${encodedScope_param}&access_type=offline`;
          const url = `${api.authGen}?${params}`;
          res.redirect(url);
        } else {
          notFound(res, 'Credential ID Not found in DB, Kindly Recheck');
        }
      })
      .catch((err: MongoError) => {
        internalServerError(res, err.name, err.message);
      });
  } else {
    res.status(200).json({ code });
  }
}
