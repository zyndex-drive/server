import { Request, Response, NextFunction } from 'express';
import { STATES, connection } from 'mongoose';

/**
 * Checks whether DB is Accessible by Checking the Mongoose Connection Status
 *
 * @param {Request} req - Express Request Object
 * @param {Response} res - Express Response Object
 * @param {NextFunction} next - Express Next Function
 */
function dbChecker(req: Request, res: Response, next: NextFunction): void {
  const mongoState = connection.readyState;
  if ([0, 2, 3].includes(mongoState)) {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error Related to Database',
      mongoStatus: STATES[mongoState],
    });
  } else {
    res.locals.dbcheck = true;
    next();
  }
}

export default dbChecker;
