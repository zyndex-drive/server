import passport from 'passport';
import {
  googleStrategyHandler,
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
    console.log('Google Oauth Enabled');
    passport.use(googleStrategy);
  }
  const facebookStrategy = await facebookStrategyHandler();
  if (facebookStrategy) {
    console.log('Facebook Oauth Enabled');
    passport.use(facebookStrategy);
  }
  const githubStrategy = await githubStrategyHandler();
  if (githubStrategy) {
    console.log('Github Oauth Enabled');
    passport.use(githubStrategy);
  }
  return passport;
}
