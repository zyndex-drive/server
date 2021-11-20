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
import { EndpointGenerator } from '@plugins/server/generators';

// Router
const router = express.Router();

// Assign Main Routes
router.use('/setup', [setupCheck, checkSecretPass], firstSetup);
router.use('/login', login);

// Default Get
router.get('/', (req, res) => {
  okResponse<string>(res, 'Server Successfully Started');
});

// Respond with all the Endpoints in this Route
router.post('/endpoints', (req, res) =>
  new EndpointGenerator(res, router).serve(),
);

export default router;
