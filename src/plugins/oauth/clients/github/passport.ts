import { Credentials } from '@models';
import githubOauth from 'passport-github2';
import { handleVerification } from '@plugins/oauth/helpers';

import type { Strategy, Profile } from 'passport';
import type { VerifyCallback } from 'passport-oauth2';

/**
 * Creates a Passport Strategy for Github Oauth;
 *
 * @returns {Strategy} - Github Strategy
 */
export default async function (): Promise<Strategy | null> {
  const credentials = await Credentials.findOne({
    type: 'github',
    login: true,
  });
  if (credentials) {
    const [redirectUri] = credentials.redirect_uri.filter(
      (creds) => creds.type === 'login',
    );
    const strategy = new githubOauth.Strategy(
      {
        clientID: credentials.client_id,
        clientSecret: credentials.client_secret,
        callbackURL: redirectUri.uri,
      },
      (
        accessToken: string,
        refreshToken: string,
        userProfile: Profile,
        done: VerifyCallback,
      ) => {
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
