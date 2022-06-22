// Initialization
import express from 'express';

// Models
import { Policies } from '@models';

// Auth Helpers
import { policies as policyAuth } from '@plugins/auth';

// Response Handlers
import { errorResponseHandler, okResponse } from '@plugins/server/responses';

// Types
import type { RequestHandler } from 'express';
import type { IPolicy, IUserDoc } from '@models/types';
import { UnAuthorized, BadRequest } from '@plugins/errors';

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
    if (req.user) {
      const user: IUserDoc = req.user;
      const { policiesToUpdate }: { policiesToUpdate: IPolicy[] } = req.body;
      const searchQs = {
        $or: policiesToUpdate.map((policy) => {
          if (policy._id) {
            return {
              _id: policy._id,
            };
          } else {
            throw new BadRequest(
              'policiesToUpdate',
              'Requests.data to be of type IPolicy',
            );
          }
        }),
      };
      const policyDocs = await Policies.find(searchQs).exec();
      const promises = policiesToUpdate.map((modPolicy) => {
        const [currentPolicyDoc] = policyDocs.filter(
          (policy) => String(policy._id) === String(modPolicy._id),
        );
        return policyAuth.edit(user, currentPolicyDoc, modPolicy);
      });
      await Promise.all(promises);
      okResponse(res, {
        updated: true,
        records: policiesToUpdate.map((policy) => String(policy._id)),
      });
    } else {
      throw new UnAuthorized(
        'User Not found in the Request, hence Unauthorized',
      );
    }
  } catch (e) {
    errorResponseHandler(res, e);
  }
}) as RequestHandler);

export default router;
