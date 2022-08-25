import passport from 'passport';
import {
  googleStrategyHandler,
  facebookStrategyHandler,
  githubStrategyHandler,
} from '@plugins/oauth/clients';
import { logger } from '@plugins';

import type { PassportStatic } from 'passport';

/**
 * Initializes all the Passport Oauth Handlers
 *
 * @returns {PassportStatic} - Passport Object
 */
export async function initializePassport(): Promise<PassportStatic> {
  const googleStrategy = await googleStrategyHandler();
  if (googleStrategy) {
    logger.info('Google Oauth Enabled');
    passport.use(googleStrategy);
  }
  const facebookStrategy = await facebookStrategyHandler();
  if (facebookStrategy) {
    logger.info('Facebook Oauth Enabled');
    passport.use(facebookStrategy);
  }
  const githubStrategy = await githubStrategyHandler();
  if (githubStrategy) {
    logger.info('Github Oauth Enabled');
    passport.use(githubStrategy);
  }
  return passport;
}
