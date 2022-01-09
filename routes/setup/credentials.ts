// Initialization
import express from 'express';

// Response Handlers
import {
  okResponse,
  createdResponse,
  badRequest,
  internalServerError,
} from '@plugins/server/responses';

// Model
import { Credentials } from '@models';

// Others
import { EndpointGenerator } from '@plugins/server/generators';
import { objectID, isUndefined } from '@plugins/misc';

// Types
import type { Error as MongoError } from 'mongoose';
import type { ICredentials, ICredentialsLeanDoc } from '@models/types';
import { IInlineResponse } from '@/types/inline.response';

// Router
const router = express.Router();

interface IRequestCredentials {
  alias: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  email: string;
}

router.post('/add', (req, res) => {
  const {
    alias,
    client_id,
    client_secret,
    redirect_uri,
    email,
  }: IRequestCredentials = req.body;
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
        createdResponse<ICredentialsLeanDoc>(res, savedCreds.toObject());
      })
      .catch((err: MongoError) => {
        internalServerError(res, err.name, err.message);
      });
  } else {
    badRequest(res, 'alias, client_id, client_secret, email', 'Request Body');
  }
});

router.post('/get', (req, res) => {
  Credentials.find({})
    .lean()
    .exec()
    .then((credentialDocs) =>
      okResponse<ICredentialsLeanDoc[]>(res, credentialDocs),
    )
    .catch((err: MongoError) => {
      internalServerError(res, err.name, err.message);
    });
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
