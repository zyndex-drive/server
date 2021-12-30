// Initialization
import express from 'express';

// Middlewares
import { checkSecretPass } from '@plugins/server/middlewares';
import setupCheck from '@plugins/server/middlewares/first-setup';

// Others
import path from 'path';

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
router.get(/(\/.*)+/, (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});

// Respond with all the Endpoints in this Route
router.post('/endpoints', (req, res) =>
  new EndpointGenerator(res, router).serve(),
);

export default router;
