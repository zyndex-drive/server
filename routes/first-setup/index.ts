// Initialization
import express from 'express';

// Sub Routes
import policies from './policies';
import roles from './roles';
import credentials from './credentials';
import scopes from './scope';
import endpointServer from '@/helpers/express/other-handlers/endpoint-server';

// Router
const router = express.Router();

// Assign Sub Routes to Setup Route
router.use('/policies', policies);
router.use('/roles', roles);
router.use('/credentials', credentials);
router.use('/scopes', scopes);

// Respond with all the Endpoints in the Route
router.get('/endpoints', (req, res) => endpointServer(res, router));
router.post('/endpoints', (req, res) => endpointServer(res, router));

export default router;
