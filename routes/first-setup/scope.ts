// Initialization
import express from 'express';

// Response Handlers
import {
  badRequest,
  notFound,
} from '@/helpers/express/response-handlers/4XX-response';
import { okResponse } from '@/helpers/express/response-handlers/2XX-response';
import { internalServerError } from '@/helpers/express/response-handlers/5XX-response';

// Model
import { Scopes, Credentials } from '@models';

// Others
import endpointServer from '@/helpers/express/other-handlers/endpoint-server';
import { objectID } from '@helpers/uid';
import isundefined from '@/helpers/isundefined';

// Types
import type { Error as MongoError } from 'mongoose';
import type { IScope, IScopeDoc } from '@models/scope/types';
import type { IInlineResponse } from '@typs/inline.response';

// Router
const router = express.Router();

router.post('/add', (req, res) => {
  const { name, drive_id, credential_id } = req.body;
  if (!isundefined([name, drive_id, credential_id])) {
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
          Scopes.createDoc(newScope)
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
router.get('/endpoints', (req, res) => endpointServer(res, router));
router.post('/endpoints', (req, res) => endpointServer(res, router));

export default router;
