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
import type { IRoleDoc } from '@models/types';
import type { IInlineResponse } from '@typs/inline.response';

// Others
import { map as rolesMap } from '@plugins/templates/roles';
import { EndpointGenerator } from '@plugins/server/generators';

// Router
const router = express.Router();

router.post('/add', (req, res) => {
  const docs: IRoleDoc[] = [];
  const pushedStatus: boolean[] = [];
  rolesMap.forEach((role) => {
    Roles.create(role)
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
      'Successfully Posted all the Roles Details to Database',
    );
  }
});

router.post('/get', (req, res) => {
  Roles.find({})
    .then((roleDocs) => {
      okResponse<IRoleDoc[]>(res, roleDocs);
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
