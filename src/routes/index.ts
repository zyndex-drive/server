// Initialization
import express from 'express';

// Middlewares
import {
  checkSecretPass,
  checkSetupComplete,
  checkSetupNotComplete,
} from '@plugins/server/middlewares';

// Others
import path from 'path';
import { EndpointGenerator } from '@plugins/server/generators';

// Routes
import setup from './setup';
import login from './login';

// Router
const router = express.Router();

const { NODE_ENV } = process.env;

// Assign Main Routes
router.use(
  '/setup',
  NODE_ENV === 'development'
    ? [checkSecretPass]
    : [checkSecretPass, checkSetupNotComplete],
  setup,
);
router.use(
  '/login',
  NODE_ENV === 'development' ? [] : [checkSetupComplete],
  login,
);

// Serve HTML Files
router.get(/(\/.*)+/, (req, res): void => {
  const viewsPath =
    NODE_ENV === 'production'
      ? path.resolve(__dirname, 'views', 'index.html')
      : path.resolve(__dirname, '../views/index.html');
  res.status(200).sendFile(viewsPath);
});

// Respond with all the Endpoints in this Route
router.post('/endpoints', (req, res) =>
  new EndpointGenerator(res, router).serve(),
);

export default router;
