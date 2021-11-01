// Initialization
import express from 'express';

// Response Handlers
import { okResponse, internalServerError } from '@plugins/server/responses';

// Model
import { Policies } from '@models';

// Types
import type { Error as MongoError } from 'mongoose';
import type { IPolicyDoc } from '@models/policy/types';
import type { IInlineResponse } from '@typs/inline.response';

// Others
import { map as policyMap } from '@plugins/templates/policies';
import { endpointServer } from '@plugins/server';

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

// Respond with all the Endpoints in this Route
router.get('/endpoints', (req, res) => endpointServer(res, router));
router.post('/endpoints', (req, res) => endpointServer(res, router));

export default router;
