// Initialization
import express from 'express';

// Routes
import autoRoutes from './routes';

// Response handlers
import { okResponse } from '@plugins/server/responses';

// Router
const router = express.Router();

// Assign Auth Auto Routes
autoRoutes.forEach((route) => {
  router.use(`/${route.name}`, route.handler.hostAllRoutes());
});

router.post('/status', (req, res) => okResponse(res, 'OK'));

export default router;
