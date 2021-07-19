// Initialization
import express from 'express';

// Response Handlers
import { okResponse } from '@responses/2XX-response';

// Others
import { map as policyMap } from '@setup/policies';

// Types
import type { IPolicy } from '@models/policy/types';

// Router
const router = express.Router();

router.post('/list', (req, res) => {
  okResponse<Readonly<IPolicy>[]>(res, policyMap);
});

export default router;
