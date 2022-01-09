// Initialization
import express from 'express';

// Middlewares
import { checkSetupStatus, checkSecretPass } from '@plugins/server/middlewares';

// Others
import path from 'path';
import { EndpointGenerator } from '@plugins/server/generators';

// Routes
import setup from './setup';
import login from './login';

// Router
const router = express.Router();

// Assign Main Routes
router.use('/setup', [checkSetupStatus, checkSecretPass], setup);
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
