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

// Others
import { map as rolesMap } from '@plugins/templates/roles';
import { EndpointGenerator } from '@plugins/server/generators';

// Router
const router = express.Router();

router.post('/add', (req, res) => {
  Roles.create(rolesMap)
    .then(() =>
      createdResponse(
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
      okResponse(res, roleDocs);
    })
    .catch((err: MongoError) => {
      internalServerError(res, err.name, err.message);
    });
});

router.post('/status', (req, res) => {
  Roles.mapCheck()
    .then((result) => {
      okResponse(res, result);
    })
    .catch((error: MongoError) => {
      internalServerError(res, error.name, error.message);
    });
});

router.post('/reset', (req, res) => {
  Roles.clearAll()
    .then((result) => {
      okResponse(res, result);
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
