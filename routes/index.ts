// Initialization
import express from 'express';

// Middlewares
import { checkSecretPass } from '@/middlewares/first-setup';
import setupCheck from '@middlewares/first-setup';

// Response Handlers
import { okResponse } from '@/helpers/express/response-handlers/2XX-response';

// Routes
import firstSetup from './first-setup';
import policies from './policies';
import roles from './roles';
import endpointServer from '@/helpers/express/other-handlers/endpoint-server';

// Router
const router = express.Router();

// Assign Main Routes
router.use('/setup', [setupCheck, checkSecretPass], firstSetup);
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
