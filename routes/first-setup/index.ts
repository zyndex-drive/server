import express from 'express';
import { Request, Response } from 'express';
import setupCheck from '@middlewares/first-setup';

import { map as policyMap } from '@setup/policies';
import { map as roleMap } from '@setup/roles';

const router = express.Router();

router.get('/policies', setupCheck, (req: Request, res: Response) => {
  res.json(policyMap);
});

router.get('/roles', setupCheck, (req: Request, res: Response) => {
  res.json(roleMap);
});

export default router;
