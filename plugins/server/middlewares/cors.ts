// Models
import { Frontends } from '@models';

// Response Handler
import { errorResponseHandler } from '@plugins/server/responses';

import { UnAuthorized, BadRequest, InternalServerError } from '@plugins/errors';

// Types
import type { Request, Response, NextFunction } from 'express';

const { NODE_ENV } = process.env;

/**
 * Checks for the Origin Header and assigns the Cors Header if it is Validated
 *
 * @param {Request} req - Express Request Object
 * @param {Response} res - Express Response Object
 * @param {NextFunction} next - Express Next Function
 */
async function corsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
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
              throw new UnAuthorized(
                'Local Dev Secret is not Matching with the sent pass',
              );
            }
          } else {
            throw new BadRequest('x-local-dev-pass', 'response headers');
          }
        }
      } else {
        throw new InternalServerError(
          'Project not Configured for Local Development',
        );
      }
    } else {
      const domains = await Frontends.getFrontendUrls();
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
    }
  } catch (e) {
    errorResponseHandler(res, e);
  }
}

export default corsMiddleware;
