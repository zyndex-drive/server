// Initialization
import express from 'express';

// Sub Routes
import policies from './policies';

// Others
import { map as roleMap } from '@setup/roles';

const router = express.Router();

router.use('/policies', policies);

router.post('/roles', (req, res) => {
  res.json(roleMap);
});

export default router;
