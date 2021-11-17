// Initialization
import express from 'express';

// Sub Routes
import policies from './policies';
import roles from './roles';
import credentials from './credentials';
import scopes from './scope';
import { EndpointGenerator } from '@plugins/server/generators';

// Router
const router = express.Router();

// Assign Sub Routes to Setup Route
router.use('/policies', policies);
router.use('/roles', roles);
router.use('/credentials', credentials);
router.use('/scopes', scopes);

// Respond with all the Endpoints in the Route
router.post('/endpoints', (req, res) =>
  new EndpointGenerator(res, router).endpoints(),
);

export default router;
