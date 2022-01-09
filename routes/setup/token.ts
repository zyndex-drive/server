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
import { Tokens } from '@models';

// Others
import { EndpointGenerator } from '@plugins/server/generators';
import { objectID, isUndefined } from '@plugins/misc';

// Types
import type { Error as MongoError } from 'mongoose';
import type { IToken, ITokenDoc } from '@models/types';
import { IInlineResponse } from '@/types/inline.response';

// Router
const router = express.Router();

interface IRequestToken {
  token: string;
  expires_at: number;
}

router.post('/add', (req, res) => {
  Tokens.find({
    related_to: 'other',
    ref_model: 'other',
    scopes: ['all'],
    type: 'access',
    website: 'tmdb.com',
  })
    .then((tokenDocs) => {
      if (tokenDocs.length > 0) {
        okResponse<string>(res, 'TMDB API token can be Added only one Time');
      } else {
        const { token, expires_at }: IRequestToken = req.body;
        if (!isUndefined([token, expires_at])) {
          const newID = objectID('f');
          const newToken: IToken = {
            _id: newID,
            token,
            expires_at,
            related_to: 'other',
            ref_model: 'other',
            scopes: ['all'],
            type: 'access',
            website: 'tmdb.com',
          };
          Tokens.create(newToken)
            .then((newTokenDoc) => {
              createdResponse<ITokenDoc>(res, newTokenDoc);
            })
            .catch((err: MongoError) => {
              internalServerError(res, err.name, err.message);
            });
        } else {
          badRequest(
            res,
            'alias, client_id, client_secret, email',
            'Request Body',
          );
        }
      }
    })
    .catch((err: MongoError) => {
      internalServerError(res, err.name, err.message);
    });
});

router.post('/get', (req, res) => {
  Tokens.find({})
    .then((frontendDocs) => {
      okResponse<ITokenDoc[]>(res, frontendDocs);
    })
    .catch((err: MongoError) => {
      internalServerError(res, err.name, err.message);
    });
});

router.post('/reset', (req, res) => {
  Tokens.clearAll()
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
