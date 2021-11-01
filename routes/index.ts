// Initialization
import express from 'express';

// Middlewares
import { checkSecretPass } from '@plugins/server/middlewares';
import setupCheck from '@plugins/server/middlewares/first-setup';

// Response Handlers
import { okResponse } from '@plugins/server/responses';

// Routes
import firstSetup from './first-setup';
import login from './login';
import { endpointServer } from '@plugins/server/helpers';

// Router
const router = express.Router();

// Assign Main Routes
router.use('/setup', [setupCheck, checkSecretPass], firstSetup);
router.use('/login', login);

// Respond with all the Endpoints in this Route
router.get('/endpoints', (req, res) => endpointServer(res, router));
router.post('/endpoints', (req, res) => endpointServer(res, router));

// Default Get
router.get('/', (req, res) => {
  okResponse<string>(res, 'Server Successfully Started');
});

export default router;
