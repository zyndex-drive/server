// Initialization
import express from 'express';

// Response Handlers
import {
  okResponse,
  internalServerError,
  badRequest,
  notFound,
} from '@plugins/server/responses';

// Model
import { Scopes, Credentials } from '@models';

// Others
import { EndpointGenerator } from '@plugins/server/generators';
import { objectID, isUndefined } from '@plugins/misc';

// Types
import type { Error as MongoError } from 'mongoose';
import type { IScope, IScopeDoc } from '@models/scope/types';
import type { IInlineResponse } from '@typs/inline.response';

// Router
const router = express.Router();

router.post('/add', (req, res) => {
  const { name, drive_id, credential_id } = req.body;
  if (!isUndefined([name, drive_id, credential_id])) {
    Credentials.checkID(credential_id)
      .then((idCheck) => {
        if (idCheck) {
          const newID = objectID('scope');
          const newScope: IScope = {
            _id: newID,
            name,
            added_at: Date.now(),
            drive_id,
            related_to: [credential_id],
          };
          Scopes.create(newScope)
            .then((savedDoc) => {
              okResponse<IScopeDoc>(res, savedDoc);
            })
            .catch((err: MongoError) => {
              internalServerError(res, err.name, err.message);
            });
        } else {
          notFound(
            res,
            'Credential ID Not found in the Database, Kindly Send the Correct ID',
          );
        }
      })
      .catch((err: MongoError) => {
        internalServerError(res, err.name, err.message);
      });
  } else {
    badRequest(res, 'name, drive_id, credential_id', 'Request Body as JSON');
  }
});

router.post('/status', (req, res) => {
  Scopes.find({})
    .then((scopeDocs: IScopeDoc[]) => {
      if (scopeDocs.length > 0) {
        okResponse<IScopeDoc[]>(res, scopeDocs);
      } else {
        notFound(res, 'No Scopes Saved or Found in the Database');
      }
    })
    .catch((err: MongoError) => {
      internalServerError(res, err.name, err.message);
    });
});

router.post('/reset', (req, res) => {
  Scopes.clearAll()
    .then((result) => {
      okResponse<IInlineResponse<string>>(res, result);
      res.status(200).json(result);
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
