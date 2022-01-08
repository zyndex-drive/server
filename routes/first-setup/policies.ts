// Initialization
import express from 'express';

// Response Handlers
import {
  okResponse,
  createdResponse,
  internalServerError,
} from '@plugins/server/responses';

// Model
import { Policies } from '@models';

// Types
import type { Error as MongoError } from 'mongoose';
import type { IPolicyDoc } from '@models/types';
import type { IInlineResponse } from '@typs/inline.response';

// Others
import { map as policyMap } from '@plugins/templates/policies';
import { EndpointGenerator } from '@plugins/server/generators';

// Router
const router = express.Router();

router.post('/add', (req, res) => {
  const docs: IPolicyDoc[] = [];
  const pushedStatus: boolean[] = [];
  policyMap.forEach((policy) => {
    Policies.create(policy)
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
    createdResponse<string>(
      res,
      'Successfully Posted all the Policy Details to Database',
    );
  }
});

router.post('/get', (req, res) => {
  Policies.find({})
    .then((policyDocs) => {
      okResponse<IPolicyDoc[]>(res, policyDocs);
    })
    .catch((err: MongoError) => {
      internalServerError(res, err.name, err.message);
    });
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
router.post('/endpoints', (req, res) =>
  new EndpointGenerator(res, router).serve(),
);

export default router;
