// Initialization
import express from 'express';

// Response Handlers
import {
  createdResponse,
  errorResponseHandler,
} from '@plugins/server/responses';

import { BadRequest } from '@plugins/errors';

// Model
import { Frontends } from '@models';

// Others
import { objectID, isUndefined } from '@plugins/misc';

// Types
import type { RequestHandler } from 'express';
import type { IFrontend } from '@models/types';

// Router
const router = express.Router();

router.post('/add', (async (req, res) => {
  try {
    const { domain, name } = req.body;
    if (!isUndefined([domain, name])) {
      const newID = objectID();
      const newFrontend: IFrontend = {
        _id: newID,
        domain,
        name,
      };
      const frontendDoc = await Frontends.create(newFrontend);
      createdResponse(res, frontendDoc.toObject());
    } else {
      throw new BadRequest(
        'alias, client_id, client_secret, email',
        'Request Body',
      );
    }
  } catch (e) {
    errorResponseHandler(res, e);
  }
}) as RequestHandler);

export default router;
