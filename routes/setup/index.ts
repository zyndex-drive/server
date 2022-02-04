// Initialization
import express from 'express';

// Responses
import { okResponse, errorResponseHandler } from '@/plugins/server/responses';

// Route Map
import routes from './routes';

// Others
import { db } from '@plugins';
import { EndpointGenerator } from '@plugins/server/generators';

import type { RequestHandler } from 'express';

// Router
const router = express.Router();

// Assign Sub Routes to Setup Route
routes.forEach((route) => {
  router.use(route.name, route.map);
  router.use(route.name, route.setup);
});

router.delete('/reset', (async (req, res) => {
  try {
    await db.reset();
    okResponse(
      res,
      'Successfully Dropped the Database, Please Restart the Server to Start afresh',
    );
  } catch (e) {
    errorResponseHandler(res, e);
  }
}) as RequestHandler);

// Respond with all the Endpoints in the Route
router.post('/endpoints', (req, res) => {
  new EndpointGenerator(res, router).serve();
});

export default router;
