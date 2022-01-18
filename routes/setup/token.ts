// Initialization
import express from 'express';

// Response Handlers
import {
  okResponse,
  createdResponse,
  errorResponseHandler,
} from '@plugins/server/responses';

import { BadRequest } from '@plugins/errors';

// Model
import { Tokens } from '@models';

// Others
import { objectID, isUndefined } from '@plugins/misc';

// Types
import type { RequestHandler } from 'express';

// Router
const router = express.Router();

interface IRequestToken {
  token: string;
  expires_at: number;
}

router.post('/add', (async (req, res) => {
  try {
    const tokenDocs = await Tokens.find({
      related_to: 'other',
      ref_model: 'other',
      scopes: ['all'],
      type: 'access',
      website: 'tmdb.com',
    });
    if (tokenDocs.length > 0) {
      okResponse(res, 'TMDB API token can be Added only one Time');
    } else {
      const { token, expires_at }: IRequestToken = req.body;
      if (!isUndefined([token, expires_at])) {
        const newID = objectID('f');
        const newToken = new Tokens({
          _id: newID,
          token,
          expires_at,
          related_to: 'other',
          ref_model: 'other',
          scopes: ['all'],
          type: 'access',
          website: 'tmdb.com',
        });
        const newTokenDoc = await newToken.save();
        createdResponse(res, newTokenDoc.toObject());
      } else {
        throw new BadRequest(
          'alias, client_id, client_secret, email',
          'Request Body',
        );
      }
    }
  } catch (e) {
    errorResponseHandler(res, e);
  }
}) as RequestHandler);

export default router;
