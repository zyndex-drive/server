// Initialization
import express from 'express';
import { passportAuthenticate } from '@plugins/oauth';

import { sessionManager } from '@plugins';

// Response Handlers
import { okResponse, errorResponseHandler } from '@plugins/server/responses';

// Google Oauth
import { normalAccountHandler } from '@plugins/google';

// Google Drive
import { oauthScopes } from '@plugins/google';

import type { IUserDoc } from '@models/types';
import type { RequestHandler } from 'express';

// Router
const router = express.Router();

// Google Oauth Login Route
router.get('/oauth/', (req, res) => {
  normalAccountHandler.generateOauth(req, res, [
    ...oauthScopes.drive,
    ...oauthScopes.iam,
  ]);
});

router.get(
  '/onboarding',
  (req, res, next) =>
    passportAuthenticate(
      { req, res, next },
      {
        strgy: 'google',
        opts: {
          scope: ['profile'],
          session: false,
        },
      },
      req.query['state'],
    )(req, res, next),
  (async (req, res) => {
    try {
      const user: IUserDoc = req.user;
      const frontendId: string = res.locals.state;
      const sessionResponse = await sessionManager.createSession(
        req,
        user,
        frontendId,
      );
      okResponse(res, sessionResponse);
    } catch (e) {
      errorResponseHandler(res, e);
    }
  }) as RequestHandler,
);

export default router;
