// Initialization
import express from 'express';

// Response Handlers
import { okResponse } from '@/helpers/express/response-handlers/2XX-response';

// Others
import { map as rolesMap } from '@setup/roles';

// Types
import type { IRole } from '@models/role/types';
import endpointServer from '@/helpers/express/other-handlers/endpoint-server';

// Router
const router = express.Router();

router.post('/list', (req, res) => {
  okResponse<Readonly<IRole>[]>(res, rolesMap);
});

// Respond with all the Endpoints in this Route
router.get('/endpoints', (req, res) => endpointServer(res, router));
router.post('/endpoints', (req, res) => endpointServer(res, router));

export default router;
