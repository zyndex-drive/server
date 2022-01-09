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
import type { IPolicyLeanDoc } from '@models/types';
import type { IInlineResponse } from '@typs/inline.response';

// Others
import { map as policyMap } from '@plugins/templates/policies';
import { EndpointGenerator } from '@plugins/server/generators';

// Router
const router = express.Router();

router.post('/add', (req, res) => {
  Policies.create(policyMap)
    .then(() => {
      createdResponse<string>(
        res,
        'Successfully Posted all the Policy Details to Database',
      );
    })
    .catch((err: MongoError) => {
      internalServerError(res, err.name, err.message);
    });
});

router.post('/get', (req, res) => {
  Policies.find({})
    .lean()
    .exec()
    .then((policyDocs) => {
      okResponse<IPolicyLeanDoc[]>(res, policyDocs);
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
