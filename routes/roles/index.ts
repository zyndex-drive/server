// Initialization
import express from 'express';

// Response Handlers
import { okResponse } from '@responses/2XX-response';

// Others
import { map as rolesMap } from '@setup/roles';

// Types
import type { IRole } from '@models/role/types';

// Router
const router = express.Router();

router.post('/list', (req, res) => {
  okResponse<Readonly<IRole>[]>(res, rolesMap);
});

export default router;
