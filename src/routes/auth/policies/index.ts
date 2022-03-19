// Initialization
import express from 'express';

// Response Handlers
import { okResponse } from '@plugins/server/responses';

// Others
import { map as policyMap } from '@plugins/templates/policies';

// Types
import { EndpointGenerator } from '@plugins/server/generators';

// Router
const router = express.Router();

router.post('/list', (req, res) => {
  okResponse(res, policyMap);
});

// Respond with all the Endpoints in this Route
router.post('/endpoints', (req, res) =>
  new EndpointGenerator(res, router).serve(),
);

export default router;
