// Initialization
import express from 'express';

// Route Map
import routes from './routes';

// Others
import { EndpointGenerator } from '@plugins/server/generators';

// Router
const router = express.Router();

// Assign Sub Routes to Setup Route
routes.forEach((route) => {
  router.use(route.name, route.map);
  router.use(route.name, route.setup);
});

// Respond with all the Endpoints in the Route
router.post('/endpoints', (req, res) =>
  new EndpointGenerator(res, router).serve(),
);

export default router;
