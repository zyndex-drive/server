import { Request, Response, NextFunction } from 'express';

const originCheck = (req: Request, res: Response, next: NextFunction) => {
  const allowedDomains: Array<string> = process.env['FRONT']
    ? JSON.parse(process.env['FRONT'])
    : [];

  const { origin } = req.headers;
  console.log(allowedDomains, origin);
  if (origin) {
    if (allowedDomains.indexOf(origin) > -1) {
      console.log(allowedDomains.indexOf(origin));
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type, Accept,secure_hash,requested_at',
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
};

export default originCheck;
