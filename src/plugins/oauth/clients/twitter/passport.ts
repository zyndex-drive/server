import { Credentials } from '@models';
import twitterStrategy from 'passport-twitter';
import { handleVerification } from '@plugins/oauth/helpers';

import type { Strategy } from 'passport';

/**
 * Creates a Passport Strategy for Twitter Oauth;
 *
 * @returns {Strategy} - Twitter Strategy
 */
export default async function (): Promise<Strategy | null> {
  const credentials = await Credentials.findOne({
    type: 'twitter',
    login: true,
  });
  if (credentials) {
    const [redirectUri] = credentials.redirect_uri.filter(
      (creds) => creds.type === 'login',
    );
    const strategy = new twitterStrategy.Strategy(
      {
        consumerKey: credentials.client_id,
        consumerSecret: credentials.client_secret,
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
