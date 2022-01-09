// Initialization
import express from 'express';

// Response Handlers
import {
  okResponse,
  createdResponse,
  internalServerError,
} from '@plugins/server/responses';

// Model
import { Roles } from '@models';

// Types
import type { Error as MongoError } from 'mongoose';
import type { IRoleLeanDoc } from '@models/types';
import type { IInlineResponse } from '@typs/inline.response';

// Others
import { map as rolesMap } from '@plugins/templates/roles';
import { EndpointGenerator } from '@plugins/server/generators';

// Router
const router = express.Router();

router.post('/add', (req, res) => {
  Roles.create(rolesMap)
    .then(() =>
      createdResponse<string>(
        res,
        'Successfully Posted all the Roles Details to Database',
      ),
    )
    .catch((err: MongoError) => {
      internalServerError(res, err.name, err.message);
    });
});

router.post('/get', (req, res) => {
  Roles.find({})
    .lean()
    .exec()
    .then((roleDocs) => {
      okResponse<IRoleLeanDoc[]>(res, roleDocs);
    })
    .catch((err: MongoError) => {
      internalServerError(res, err.name, err.message);
    });
});

router.post('/status', (req, res) => {
  Roles.mapCheck()
    .then((result) => {
      okResponse<IInlineResponse<boolean>>(res, result);
    })
    .catch((error: MongoError) => {
      internalServerError(res, error.name, error.message);
    });
});

router.post('/reset', (req, res) => {
  Roles.clearAll()
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
