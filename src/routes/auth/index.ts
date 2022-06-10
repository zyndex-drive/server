// Initialization
import express from 'express';

// Routes
import policies from './policies';
import roles from './roles';

// Response handlers
import { okResponse } from '@plugins/server/responses';

// Router
const router = express.Router();

// Assign Auth Routes
router.use('/policies', policies);
router.use('/roles', roles);

router.post('/status', (req, res) => {
  okResponse(res, 'OK');
});

export default router;
