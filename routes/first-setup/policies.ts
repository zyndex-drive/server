// Initialization
import express from 'express';

// Response Handlers
import { okResponse } from '@responses/2XX-response';
import { internalServerError } from '@responses/5XX-response';

// Model
import { Policies } from '@models';

// Types
import type { Error as MongoError } from 'mongoose';
import type { IPolicyDoc } from '@models/policy/types';
import type { IInlineResponse } from '@typs/inline.response';

// Others
import { map as policyMap } from '@setup/policies';

const router = express.Router();

router.post('/add', (req, res) => {
  const docs: IPolicyDoc[] = [];
  const pushedStatus: boolean[] = [];
  policyMap.forEach((policy) => {
    Policies.createDoc(policy)
      .then((doc) => {
        docs.push(doc);
        pushedStatus.push(true);
      })
      .catch((err) => {
        console.log(err);
        pushedStatus.push(false);
      });
  });
  if (pushedStatus.includes(false)) {
    internalServerError(
      res,
      'Database',
      'Some Internal Error Occured, Not all Records have been Added to Database',
    );
  } else {
    okResponse<string>(
      res,
      'Successfully Posted all the Policy Details to Database',
    );
  }
});

router.post('/status', (req, res) => {
  Policies.find({})
    .then((policies) => {
      const totalPolicies = policyMap.length;
      const ids = {
        map: policyMap.map((policy) => policy._id),
        toCompare: policies.map((policy) => policy._id),
      };
      const presentStatus: boolean[] = [];
      ids.map.forEach((policy) => {
        presentStatus.push(ids.toCompare.includes(policy));
      });
      const truthy = presentStatus.filter((status) => status).length;
      if (truthy === totalPolicies) {
        const result = {
          present: true,
          totalPolicies,
        };
        okResponse<typeof result>(res, result);
      } else {
        const result = {
          present: false,
          totalPolicies,
          remainingPolicies: totalPolicies - truthy,
        };
        okResponse<typeof result>(res, result);
      }
    })
    .catch((error: MongoError) => {
      internalServerError(res, error.name, error.message);
    });
});

router.post('/reset', (req, res) => {
  Policies.clearAll()
    .then((result) => {
      okResponse<IInlineResponse<string>>(res, result);
    })
    .catch((error: MongoError) => {
      internalServerError(res, error.name, error.message);
    });
});

export default router;
