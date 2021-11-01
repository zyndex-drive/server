// Models
import { Frontends } from '@models';

// Response Handler
import {
  unAuthorized,
  badRequest,
  internalServerError,
} from '@plugins/server/responses';

// Types
import type { Error as MongoError } from 'mongoose';
import type { Request, Response, NextFunction } from 'express';

const { NODE_ENV } = process.env;

/**
 * Checks for the Origin Header and assigns the Cors Header if it is Validated
 *
 * @param {Request} req - Express Request Object
 * @param {Response} res - Express Response Object
 * @param {NextFunction} next - Express Next Function
 */
function corsMiddleware(req: Request, res: Response, next: NextFunction): void {
  if (NODE_ENV === 'development') {
    const reqType = req.method;
    const secret = process.env.LOCAL_SECRET;
    if (secret) {
      const headerPass = req.headers['x-local-dev-pass'];
      if (reqType === 'GET') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader(
          'Access-Control-Allow-Headers',
          'x-local-dev-pass,x-secret-pass,X-Requested-With,content-type, Accept',
        );
        next();
      } else {
        if (headerPass) {
          if (secret === headerPass) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
            res.setHeader(
              'Access-Control-Allow-Headers',
              'x-local-dev-pass,x-secret-pass,X-Requested-With,content-type, Accept',
            );
            next();
          } else {
            unAuthorized(
              res,
              'Local Dev Secret is not Matching with the sent pass',
            );
          }
        } else {
          badRequest(res, 'x-local-dev-pass', 'response headers');
        }
      }
    } else {
      internalServerError(
        res,
        'Secret Error',
        'Project not Configured for Local Development',
      );
    }
  } else {
    Frontends.getFrontendUrls()
      .then((domains) => {
        const allowedDomains = domains.map((dom) => dom.domain);
        const { origin } = req.headers;
        if (origin && allowedDomains.indexOf(origin) > -1) {
          res.setHeader('Access-Control-Allow-Origin', origin);
        }
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader(
          'Access-Control-Allow-Headers',
          'x-local-dev-pass,x-secret-pass,X-Requested-With,content-type, Accept',
        );
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        next();
      })
      .catch((error: MongoError) => {
        internalServerError(res, error.name, error.message);
      });
  }
}

export default corsMiddleware;
