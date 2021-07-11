// Initialization
import express from 'express';

// Sub Routes
import policy from './policies';

// Others
import { map as roleMap } from '@setup/roles';

const router = express.Router();

router.use('/policy', policy);

router.post('/roles', (req, res) => {
  res.json(roleMap);
});

export default router;
