// Initialization
import express from 'express';

// Models
import { Policies } from '@models';

// Response Handlers
import { errorResponseHandler, okResponse } from '@plugins/server/responses';

// Types
import type { RequestHandler } from 'express';
import type { IPolicy } from '@models/types';

// Router
const router = express.Router();

router.post('/list', (async (req, res) => {
  try {
    const policies = await Policies.find({}).lean();
    okResponse(res, policies);
  } catch (e) {
    errorResponseHandler(res, e);
  }
}) as RequestHandler);

router.post('/update', (async (req, res) => {
  try {
    const { policiesToUpdate }: { policiesToUpdate: IPolicy[] } = req.body;
    const promises = policiesToUpdate.map((policy) => {
      const { _id, ...toUpdate } = policy;
      return Policies.updateOne({ _id }, { $set: toUpdate });
    });
    await Promise.all(promises);
    okResponse(res, {
      updated: true,
      records: policiesToUpdate.map((policy) => String(policy._id)),
    });
  } catch (e) {
    errorResponseHandler(res, e);
  }
}) as RequestHandler);

export default router;
