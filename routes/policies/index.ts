// Initialization
import express from 'express';

// Response Handlers
import { okResponse } from '@/helpers/express/response-handlers/2XX-response';

// Others
import { map as policyMap } from '@setup/policies';

// Types
import type { IPolicy } from '@models/policy/types';
import endpointServer from '@/helpers/express/other-handlers/endpoint-server';

// Router
const router = express.Router();

router.post('/list', (req, res) => {
  okResponse<Readonly<IPolicy>[]>(res, policyMap);
});

// Respond with all the Endpoints in this Route
router.get('/endpoints', (req, res) => endpointServer(res, router));
router.post('/endpoints', (req, res) => endpointServer(res, router));

export default router;
