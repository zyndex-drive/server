// Initialization
import express from 'express';

// Response Handlers
import {
  createdResponse,
  errorResponseHandler,
} from '@plugins/server/responses';

import { BadRequest } from '@plugins/errors';

// Model
import { Credentials } from '@models';

// Others
import { objectID, isUndefined } from '@plugins/misc';

// Types
import type { RequestHandler } from 'express';
import type { ICredentials } from '@models/types';

// Router
const router = express.Router();

interface IRequestCredentials {
  alias: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  email: string;
}

router.post('/add', (async (req, res) => {
  try {
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
      const savedCreds = await Credentials.create(newCredential);
      createdResponse(res, savedCreds.toObject());
    } else {
      throw new BadRequest(
        'alias, client_id, redirect_uri, client_secret, email',
        'Request Body',
      );
    }
  } catch (e) {
    errorResponseHandler(res, e);
  }
}) as RequestHandler);

export default router;