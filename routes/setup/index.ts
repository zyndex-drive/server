// Initialization
import express from 'express';

// Sub Routes
import credentials from './credentials';
import policies from './policies';
import roles from './roles';
import scopes from './scope';
import frontends from './frontend';
import settings from './settings';
import tokens from './token';
import smtpProviders from './smtp-provider';
import smtpMailers from './smtp-mailer';
import users from './user';

// Others
import { EndpointGenerator } from '@plugins/server/generators';

// Router
const router = express.Router();

// Assign Sub Routes to Setup Route
router.use('/credentials', credentials);
router.use('/policies', policies);
router.use('/roles', roles);
router.use('/scopes', scopes);
router.use('/frontends', frontends);
router.use('/settings', settings);
router.use('/tokens', tokens);
router.use('/smtp-provider', smtpProviders);
router.use('/smtp-mailers', smtpMailers);
router.use('/users', users);

// Respond with all the Endpoints in the Route
router.post('/endpoints', (req, res) =>
  new EndpointGenerator(res, router).serve(),
);

export default router;
