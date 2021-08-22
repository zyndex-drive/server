// Initialization
import express from 'express';

// Response Handlers
import { okResponse } from '@/helpers/express/response-handlers/2XX-response';
import { badRequest } from '@/helpers/express/response-handlers/4XX-response';
import { internalServerError } from '@/helpers/express/response-handlers/5XX-response';

// Model
import { Credentials } from '@models';

// Others
import { objectID } from '@helpers/uid';
import isundefined from '@helpers/isundefined';

// Types
import type { Error as MongoError } from 'mongoose';
import type { ICredentials, ICredentialsDoc } from '@models/credential/types';
import { IInlineResponse } from '@/types/inline.response';
import endpointServer from '@/helpers/express/other-handlers/endpoint-server';

// Router
const router = express.Router();

router.post('/add', (req, res) => {
  const { alias, client_id, client_secret, redirect_uri, email } = req.body;
  if (!isundefined([alias, client_id, client_secret, redirect_uri, email])) {
    const newID = objectID('c');
    const newCredential: ICredentials = {
      _id: newID,
      alias,
      client_id,
      client_secret,
      redirect_uri,
      email,
    };
    Credentials.createDoc(newCredential)
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
router.get('/endpoints', (req, res) => endpointServer(res, router));
router.post('/endpoints', (req, res) => endpointServer(res, router));

export default router;
