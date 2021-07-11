// Initialization
import express from 'express';

// Model
import { Policies } from '@models';

// Types
// import type { IPolicy } from '@models/policy/types';

// Others
import { map as policyMap } from '@setup/policies';

const router = express.Router();

router.post('/create', (req, res) => {
  const data = policyMap[0];
  Policies.createPolicy(data)
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post('/list', (req, res) => {
  res.status(200).json(policyMap);
});

export default router;
