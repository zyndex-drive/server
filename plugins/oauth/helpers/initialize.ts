import passport from 'passport';
import {
  googleStrategyHandler,
  twitterStrategyHandler,
} from '@plugins/oauth/clients';

import type { PassportStatic } from 'passport';

/**
 * Initializes all the Passport Oauth Handlers
 *
 * @returns {PassportStatic} - Passport Object
 */
export async function initializePassport(): Promise<PassportStatic> {
  const googleStrategy = await googleStrategyHandler();
  if (googleStrategy) {
    passport.use(googleStrategy);
  }
  const twitterStrategy = await twitterStrategyHandler();
  if (twitterStrategy) {
    passport.use(twitterStrategy);
  }
  return passport;
}
