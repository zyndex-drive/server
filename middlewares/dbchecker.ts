import { Request, Response, NextFunction } from 'express';
import { Frontends } from '@models';

/**
 * Checks whether DB is Accessible with Frontend Collection and if not Cancels the Request
 *
 * @param {Request} req - Express Request Object
 * @param {Response} res - Express Response Object
 * @param {NextFunction} next - Express Next Function
 */
function corsMiddleware(req: Request, res: Response, next: NextFunction): void {
  Frontends.getFrontendUrls()
    .then(() => {
      next();
    })
    .catch((error) => {
      res.status(500).json({
        status: 500,
        message: 'Internal Server Error Related to Database',
        error,
      });
    });
}

export default corsMiddleware;
