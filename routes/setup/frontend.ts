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
import { Frontends } from '@models';

// Others
import { EndpointGenerator } from '@plugins/server/generators';
import { objectID, isUndefined } from '@plugins/misc';

// Types
import type { Error as MongoError } from 'mongoose';
import type { IFrontend, IFrontendLeanDoc } from '@models/types';
import { IInlineResponse } from '@/types/inline.response';

// Router
const router = express.Router();

interface IRequestFrontend {
  domain: string;
  name: string;
}

router.post('/add', (req, res) => {
  const { domain, name }: IRequestFrontend = req.body;
  if (!isUndefined([domain, name])) {
    const newID = objectID('f');
    const newFrontend: IFrontend = {
      _id: newID,
      domain,
      name,
    };
    Frontends.create(newFrontend)
      .then((frontendDoc) => {
        createdResponse<IFrontendLeanDoc>(res, frontendDoc.toObject());
      })
      .catch((err: MongoError) => {
        internalServerError(res, err.name, err.message);
      });
  } else {
    badRequest(res, 'alias, client_id, client_secret, email', 'Request Body');
  }
});

router.post('/get', (req, res) => {
  Frontends.find({})
    .lean()
    .exec()
    .then((frontendDocs) => {
      okResponse<IFrontendLeanDoc[]>(res, frontendDocs);
    })
    .catch((err: MongoError) => {
      internalServerError(res, err.name, err.message);
    });
});

router.post('/reset', (req, res) => {
  Frontends.clearAll()
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
