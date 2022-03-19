// Initialization
import express from 'express';

// Response Handlers
import {
  okResponse,
  createdResponse,
  errorResponseHandler,
} from '@plugins/server/responses';

// Model
import { Policies } from '@models';

// Types
import type { RequestHandler } from 'express';

// Others
import { map as policyMap } from '@plugins/templates/policies';

// Router
const router = express.Router();

router.post('/add', (async (req, res) => {
  try {
    await Policies.create(policyMap);
    createdResponse(
      res,
      'Successfully Posted all the Policy Details to Database',
    );
  } catch (e) {
    errorResponseHandler(res, e);
  }
}) as RequestHandler);

router.post('/status', (async (req, res) => {
  try {
    const result = await Policies.mapCheck();
    okResponse(res, result);
  } catch (e) {
    errorResponseHandler(res, e);
  }
}) as RequestHandler);

export default router;
