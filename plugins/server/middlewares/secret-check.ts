// Response Handlers
import { errorResponseHandler } from '@plugins/server/responses';

// Http Error Classes
import { BadRequest, UnAuthorized, InternalServerError } from '@plugins/errors';

// Type Imports
import { Request, Response, NextFunction } from 'express';

/**
 * Validates the Given Secret with Environment Secret for Setting Up First Time Data
 *
 * @param {Request} req - Express Request Object
 * @param {Response} res - Express Response Object
 * @param {NextFunction} next - Express NextFunction
 */
export function checkSecretPass(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    const secret = process.env.SECRET;
    if (secret) {
      const headerPass = req.headers['x-secret-pass'];
      if (headerPass && typeof headerPass === 'string') {
        const correctedSecret = secret.toLowerCase();
        const correctedHeaderPass = headerPass.toLowerCase();
        if (correctedHeaderPass === correctedSecret) {
          res.locals.secretcheck = true;
          next();
        } else {
          throw new UnAuthorized(
            'Header Secret is Not Matching with the Environment Secret, Kindly Send the Correct Pass',
          );
        }
      } else {
        throw new BadRequest('x-secret-pass', 'Request Headers');
      }
    } else {
      throw new InternalServerError(
        'No Secret Set in the Environment, Kindly Set in Vars',
        'Secret Error',
      );
    }
  } catch (e) {
    errorResponseHandler(res, e);
  }
}
