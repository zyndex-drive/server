import { Credentials } from '@models';
import facebookOauth from 'passport-facebook';
import { handleVerification } from '@plugins/oauth/helpers';

import type { Strategy } from 'passport';

/**
 * Creates a Passport Strategy for Facebook Oauth;
 *
 * @returns {Strategy} - Facebook Strategy
 */
export default async function (): Promise<Strategy | null> {
  const credentials = await Credentials.findOne({
    type: 'facebook',
    login: true,
  });
  if (credentials) {
    const [redirectUri] = credentials.redirect_uri.filter(
      (creds) => creds.type === 'login',
    );
    const strategy = new facebookOauth.Strategy(
      {
        clientID: credentials.client_id,
        clientSecret: credentials.client_secret,
        callbackURL: redirectUri.uri,
      },
      (accessToken, refreshToken, userProfile, done) => {
        handleVerification(userProfile)
          .then((user) => done(null, user))
          .catch((err) => {
            done(new Error(String(err)));
          });
      },
    );
    return strategy;
  } else {
    return null;
  }
}
