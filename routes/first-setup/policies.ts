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

// Router
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
  Policies.mapCheck()
    .then((result) => {
      okResponse<IInlineResponse<boolean>>(res, result);
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
