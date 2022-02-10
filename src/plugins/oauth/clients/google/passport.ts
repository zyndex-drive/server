import { Credentials } from '@models';
import googleOauth from 'passport-google-oauth20';
import { handleVerification } from '@plugins/oauth/helpers';

import type { Strategy } from 'passport';

/**
 * Creates a Passport Strategy for Google Oauth;
 *
 * @returns {Strategy} - Google Strategy
 */
export default async function (): Promise<Strategy | null> {
  const credentials = await Credentials.findOne({
    type: 'google',
    login: true,
  });
  if (credentials) {
    const [redirectUri] = credentials.redirect_uri.filter(
      (creds) => creds.type === 'login',
    );
    const strategy = new googleOauth.Strategy(
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
