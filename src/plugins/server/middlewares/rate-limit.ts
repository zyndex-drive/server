import rateLimiter from 'express-rate-limit';
import { GlobalSettings } from '@models';
import {
  NotFound,
  InternalServerError,
  TooManyRequests,
} from '@plugins/errors';
import { errorResponseHandler } from '@plugins/server/responses';

import type { Request, Response, NextFunction } from 'express';
import type { RateLimitRequestHandler } from 'express-rate-limit';

const localRateLimiter = (
  requests: number,
  message: string,
): RateLimitRequestHandler =>
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: requests,
    standardHeaders: true,
    handler: (req, res /* next */) => {
      res.setHeader('Retry-After', 15 * 60);
      errorResponseHandler(res, new TooManyRequests(message));
    },
  });

const promiseRateLimiter = async (
  settingsCode: string,
  limiterMessage: string,
): Promise<RateLimitRequestHandler> => {
  try {
    const rateLimiterSettings = await GlobalSettings.findOne({
      code: settingsCode,
    })
      .lean()
      .exec();
    if (
      rateLimiterSettings &&
      typeof rateLimiterSettings.global_flag === 'number'
    ) {
      return localRateLimiter(rateLimiterSettings.global_flag, limiterMessage);
    } else {
      throw new NotFound(
        'Global Rate Limiter Settings not found in Global Settings',
      );
    }
  } catch (e: unknown) {
    throw new InternalServerError(String(e));
  }
};

/**
 * Creates a Global Rate Limiter Middleware which Applies for the whole application except views path
 *
 * @param {Request} req - Express Request Object
 * @param {Response} res - Express Response Object
 * @param {NextFunction} next  - Express Next Function
 */
export async function globalRateLimiter(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const rateLimiter = await promiseRateLimiter(
      'global-rate-limiter',
      'Exception Caught in Global Rate Limiter: You made too many requests, please try again later.',
    );
    rateLimiter(req, res, next);
  } catch (e) {
    errorResponseHandler(res, e);
  }
}

/**
 * Creates a User Rate Limiter Middleware which Applies for the User API paths
 *
 * @param {Request} req - Express Request Object
 * @param {Response} res - Express Response Object
 * @param {NextFunction} next  - Express Next Function
 */
export async function userRateLimiter(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const rateLimiter = await promiseRateLimiter(
      'user-rate-limiter',
      'Exception Caught in User Rate Limiter: You made too many requests, please try again later.',
    );
    rateLimiter(req, res, next);
  } catch (e) {
    errorResponseHandler(res, e);
  }
}

/**
 * Creates a Media Rate Limiter Middleware which Applies for the Media API paths
 *
 * @param {Request} req - Express Request Object
 * @param {Response} res - Express Response Object
 * @param {NextFunction} next  - Express Next Function
 */
export async function mediaRateLimiter(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const rateLimiter = await promiseRateLimiter(
      'media-rate-limiter',
      'Exception Caught in Media Rate Limiter: You made too many Media requests, please try again later.',
    );
    rateLimiter(req, res, next);
  } catch (e) {
    errorResponseHandler(res, e);
  }
}
