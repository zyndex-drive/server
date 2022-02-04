import { GlobalSettings } from '@models';

// Response Handlers
import { errorResponseHandler } from '@plugins/server/responses';
import { Forbidden } from '@plugins/errors';

import type { Request, Response, NextFunction } from 'express';

const setupFlag = async (): Promise<boolean> => {
  const setup = await GlobalSettings.findOne({ code: 'setup-flag' });
  if (setup) {
    return typeof setup.global_flag === 'boolean' ? setup.global_flag : false;
  } else {
    return false;
  }
};

/**
 * Allows the Request to Pass Through the Middlware only when Setup is Not Complete
 *
 * @param {Request} req - Request
 * @param {Response} res - Response
 * @param {NextFunction} next - Next Function
 */
export async function checkSetupNotComplete(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const flag = await setupFlag();
    if (flag) {
      throw new Forbidden(
        'Setup is Already Complete, You Cannot Pass this Route',
      );
    } else {
      next();
    }
  } catch (e) {
    errorResponseHandler(res, e);
  }
}

/**
 * Allows the Request to Pass Through the Middlware only when Setup is Complete
 *
 * @param {Request} req - Request
 * @param {Response} res - Response
 * @param {NextFunction} next - Next Function
 */
export async function checkSetupComplete(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const flag = await setupFlag();
    if (flag) {
      next();
    } else {
      throw new Forbidden(
        'You Need to Setup the Application First before Accessing this route',
      );
    }
  } catch (e) {
    errorResponseHandler(res, e);
  }
}
