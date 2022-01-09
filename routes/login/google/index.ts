// Initialization
import express from 'express';

// Google Oauth
import { normalAccountHandler } from '@plugins/google';

// Google Drive
import { oauthScopes } from '@plugins/google';

// Router
const router = express.Router();

// Google Oauth Login Route
router.get('/oauth/', (req, res) => {
  normalAccountHandler.generateOauth(req, res, [
    ...oauthScopes.drive,
    ...oauthScopes.iam,
  ]);
});

export default router;
