import passport from 'passport';
import {
  googleStrategyHandler,
  twitterStrategyHandler,
  facebookStrategyHandler,
  githubStrategyHandler,
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
  const facebookStrategy = await facebookStrategyHandler();
  if (facebookStrategy) {
    passport.use(facebookStrategy);
  }
  const githubStrategy = await githubStrategyHandler();
  if (githubStrategy) {
    passport.use(githubStrategy);
  }
  return passport;
}
