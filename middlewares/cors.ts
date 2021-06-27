import { Request, Response, NextFunction } from 'express';

/**
 * Checks for the Origin Header and assigns the Cors Header if it is Validated
 *
 * @param {Request} req - Express Request Object
 * @param {Response} res - Express Response Object
 * @param {NextFunction} next - Express Next Function
 */
function corsMiddleware(req: Request, res: Response, next: NextFunction): void {
  const allowedDomains: Array<string> = process.env['FRONT']
    ? JSON.parse(process.env['FRONT'])
    : [];

  const { origin } = req.headers;
  console.log(allowedDomains, origin);
  if (origin && allowedDomains.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type, Accept',
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
}

export default corsMiddleware;
