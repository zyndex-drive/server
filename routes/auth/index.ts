// Initialization
import express from 'express';

// Middlewares

// Response Handlers
import { okResponse } from '@plugins/server/responses';

// Routes
import policies from './policies';
import roles from './roles';
import { endpointServer } from '@plugins/server/helpers';

// Router
const router = express.Router();

// Assign Auth Routes
router.use('/policies', policies);
router.use('/roles', roles);

// Respond with all the Endpoints in this Route
router.get('/endpoints', (req, res) => endpointServer(res, router));
router.post('/endpoints', (req, res) => endpointServer(res, router));

// Default Get
router.get('/', (req, res) => {
  okResponse<string>(res, 'Server Successfully Started');
});

export default router;
