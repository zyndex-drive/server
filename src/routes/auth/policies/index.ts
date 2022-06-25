// Initialization
import express from 'express';

// Models
import { Policies } from '@models';

// Auth Helpers
import { policies as policyAuth } from '@plugins/auth';

// Response Handlers
import { errorResponseHandler, okResponse } from '@plugins/server/responses';
import { editDatabaseExpressHandler } from '@plugins/server/generators';
import { UnAuthorized, BadRequest } from '@plugins/errors';

// Types
import type { RequestHandler } from 'express';
import type {
  IPolicy,
  IPolicyDoc,
  IPolicyLeanDoc,
  IUserDoc,
} from '@models/types';
import type { IEditDatabaseResponse } from '@plugins/server/types';

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
      const responseData: IEditDatabaseResponse = {
        recordsUpdated: [],
        totalRecordsUpdated: 0,
        recordsNotUpdated: [],
        totalRecordsNotUpdated: 0,
      };
      const ids = policiesToUpdate.map((policy) => {
        if (policy._id) {
          return policy._id;
        } else {
          throw new BadRequest(
            'policiesToUpdate',
            'Requests.data.policiesToUpdate to be of type Partial<IPolicy>[] with mandatory property _id',
          );
        }
      });
      const getPolicyPromises = ids.map((id) =>
        Policies.findOne({ _id: String(id) })
          .lean()
          .then((doc) => doc)
          .catch(() => {
            responseData.recordsNotUpdated.push({
              id: String(id),
              updated: false,
            });
            responseData.totalRecordsNotUpdated += 1;
          }),
      );
      const allPromisePolicyDocs = await Promise.allSettled(getPolicyPromises);
      const policyDocs: IPolicyLeanDoc[] = [];
      allPromisePolicyDocs.forEach((promise) => {
        if (promise.status === 'fulfilled') {
          if (promise.value && promise.value !== undefined) {
            policyDocs.push(promise.value);
          }
        }
      });
      const promises = policyDocs.map((currentPolicyDoc) => {
        const [modPolicy] = policiesToUpdate.filter(
          (policy) => String(policy._id) === String(currentPolicyDoc._id),
        );
        return policyAuth.edit(user, currentPolicyDoc, modPolicy);
      });
      const promiseStatus = await Promise.allSettled(promises);
      promiseStatus.forEach((promise) => {
        if (promise.status === 'fulfilled') {
          if (promise.value.updated) {
            responseData.recordsUpdated.push(promise.value);
            responseData.totalRecordsUpdated += 1;
          } else {
            responseData.recordsNotUpdated.push(promise.value);
            responseData.totalRecordsNotUpdated += 1;
          }
        }
      });
      okResponse(res, responseData);
    } else {
      throw new UnAuthorized('User Not found in the Request - Unauthorized');
    }
  } catch (e) {
    errorResponseHandler(res, e);
  }
}) as RequestHandler);

router.post(
  '/sample',
  (async (req, res) =>
    await editDatabaseExpressHandler<IPolicy, IPolicyDoc, IPolicyLeanDoc>(
      req,
      res,
      Policies,
      true,
      {
        bodyProp: 'policiesToUpdate',
        modelName: 'Policy',
      },
      policyAuth.edit,
    )) as RequestHandler,
);

export default router;
