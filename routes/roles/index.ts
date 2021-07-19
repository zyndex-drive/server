// Initialization
import express from 'express';

// Others
import { map as rolesMap } from '@setup/roles';

// Router
const router = express.Router();

router.post('/list', (req, res) => {
  res.status(200).json(rolesMap);
});

export default router;
