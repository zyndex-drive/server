// Initialization
import express from 'express';

// Others
import { map as policyMap } from '@setup/policies';

const router = express.Router();

router.post('/list', (req, res) => {
  res.status(200).json(policyMap);
});

export default router;
