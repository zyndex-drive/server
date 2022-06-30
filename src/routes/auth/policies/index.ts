// Initialization
import express from 'express';

// Models
import { Policies } from '@models';

// Auth Helpers
import { policies as policyAuth } from '@plugins/auth';

// Response Handlers
import { errorResponseHandler, okResponse } from '@plugins/server/responses';
import { ExpressDatabaseHandler } from '@plugins/server/generators';

// Types
import type { RequestHandler } from 'express';
import type { IPolicy, IPolicyDoc, IPolicyLeanDoc } from '@models/types';

// Router
const router = express.Router();

// Express Handlers
const expressPolicyDatabaseHandler = new ExpressDatabaseHandler<
  IPolicy,
  IPolicyDoc,
  IPolicyLeanDoc
>(Policies, true);

router.post('/list', (async (req, res) => {
  try {
    const policies = await Policies.find({}).lean();
    okResponse(res, policies);
  } catch (e) {
    errorResponseHandler(res, e);
  }
}) as RequestHandler);

router.post(
  '/update',
  (async (req, res) =>
    await expressPolicyDatabaseHandler.editDatabaseHandler(
      req,
      res,
      {
        bodyProp: 'policiesToUpdate',
        modelName: 'Policy',
      },
      policyAuth.edit,
    )) as RequestHandler,
);

export default router;
