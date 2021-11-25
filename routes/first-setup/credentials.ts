// Initialization
import express from 'express';

// Response Handlers
import {
  okResponse,
  badRequest,
  internalServerError,
} from '@plugins/server/responses';

// Model
import { Credentials } from '@models';

// Others
import { objectID, isUndefined } from '@plugins/misc';

// Types
import type { Error as MongoError } from 'mongoose';
import type { ICredentials, ICredentialsDoc } from '@models/credential/types';
import { IInlineResponse } from '@/types/inline.response';
import { EndpointGenerator } from '@plugins/server/generators';

// Router
const router = express.Router();

router.post('/add', (req, res) => {
  const { alias, client_id, client_secret, redirect_uri, email } = req.body;
  if (!isUndefined([alias, client_id, client_secret, redirect_uri, email])) {
    const newID = objectID('c');
    const newCredential: ICredentials = {
      _id: newID,
      alias,
      client_id,
      client_secret,
      redirect_uri,
      email,
    };
    Credentials.create(newCredential)
      .then((savedCreds) => {
        okResponse<ICredentialsDoc>(res, savedCreds);
      })
      .catch((err: MongoError) => {
        internalServerError(res, err.name, err.message);
      });
  } else {
    badRequest(res, 'alias, client_id, client_secret, email', 'Request Body');
  }
});

router.post('/reset', (req, res) => {
  Credentials.clearAll()
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
