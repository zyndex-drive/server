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
import { SMTPProviders } from '@models';

// Others
import { EndpointGenerator } from '@plugins/server/generators';
import { objectID, isUndefined } from '@plugins/misc';

// Types
import type { Error as MongoError } from 'mongoose';
import type { ISMTPProvider, ISMTPProviderDoc } from '@models/types';
import { IInlineResponse } from '@/types/inline.response';

// Router
const router = express.Router();

interface IRequestSMTPProvider {
  name: string;
  alias: string;
  type: string & ('gmail' | 'others');
  smtp: {
    url: string;
    port: number;
  };
  imap: {
    url: string;
    port: number;
  };
}

router.post('/add', (req, res) => {
  const { name, alias, type, smtp, imap }: IRequestSMTPProvider = req.body;
  if (!isUndefined([name, alias, type, smtp, imap])) {
    const newID = objectID('s');
    const newSmtpProvider: ISMTPProvider = {
      _id: newID,
      name,
      alias,
      type,
      smtp,
      imap,
    };
    SMTPProviders.create(newSmtpProvider)
      .then((newSmtpProviderDoc) => {
        createdResponse<ISMTPProviderDoc>(res, newSmtpProviderDoc);
      })
      .catch((err: MongoError) => {
        internalServerError(res, err.name, err.message);
      });
  } else {
    badRequest(res, 'alias, client_id, client_secret, email', 'Request Body');
  }
});

router.post('/get', (req, res) => {
  SMTPProviders.find({})
    .then((smtpProviderDocs) => {
      okResponse<ISMTPProviderDoc[]>(res, smtpProviderDocs);
    })
    .catch((err: MongoError) => {
      internalServerError(res, err.name, err.message);
    });
});

router.post('/reset', (req, res) => {
  SMTPProviders.clearAll()
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
