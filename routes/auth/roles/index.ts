// Initialization
import express from 'express';

// Response Handlers
import { okResponse } from '@plugins/server/responses';

// Others
import { map as rolesMap } from '@plugins/templates/roles';

// Types
import type { IRole } from '@models/types';
import { EndpointGenerator } from '@plugins/server/generators';

// Router
const router = express.Router();

router.post('/list', (req, res) => {
  okResponse<Readonly<IRole>[]>(res, rolesMap);
});

// Respond with all the Endpoints in this Route
router.post('/endpoints', (req, res) =>
  new EndpointGenerator(res, router).serve(),
);

export default router;
