// Initialization
import express from 'express';

// Response Handlers
import {
  okResponse,
  createdResponse,
  badRequest,
  notFound,
  internalServerError,
} from '@plugins/server/responses';

// Model
import { SMTPMailers, SMTPProviders } from '@models';

// Others
import { EndpointGenerator } from '@plugins/server/generators';
import { objectID, isUndefined } from '@plugins/misc';

// Types
import type { Error as MongoError } from 'mongoose';
import type { ISMTPMailer, ISMTPMailerLeanDoc } from '@models/types';
import { IInlineResponse } from '@/types/inline.response';

// Router
const router = express.Router();

interface IRequestSMTPMail {
  name: string;
  email: string;
  password: string;
  type: string & ('gmail' | 'others');
  provider_id: string;
}

router.post('/add', (req, res) => {
  const { name, email, password, type, provider_id }: IRequestSMTPMail =
    req.body;
  if (!isUndefined([name, email, password, type, provider_id])) {
    SMTPProviders.findById(provider_id)
      .lean()
      .exec()
      .then((smtpProviderDoc) => {
        if (smtpProviderDoc) {
          const newID = objectID('f');
          const newSmtpMailer: ISMTPMailer = {
            _id: newID,
            name,
            email,
            password,
            type,
            provider: smtpProviderDoc._id,
          };
          SMTPMailers.create(newSmtpMailer)
            .then((newSmtpMailerDoc) => {
              createdResponse<ISMTPMailerLeanDoc>(res, newSmtpMailerDoc);
            })
            .catch((err: MongoError) => {
              internalServerError(res, err.name, err.message);
            });
        } else {
          notFound(res, 'SMTP Provider ID Not Found in the Database');
        }
      })
      .catch((err: MongoError) => {
        internalServerError(res, err.name, err.message);
      });
  } else {
    badRequest(res, 'alias, client_id, client_secret, email', 'Request Body');
  }
});

router.post('/get', (req, res) => {
  SMTPMailers.find({})
    .lean()
    .exec()
    .then((smtpMailerDocs) => {
      okResponse<ISMTPMailerLeanDoc[]>(res, smtpMailerDocs);
    })
    .catch((err: MongoError) => {
      internalServerError(res, err.name, err.message);
    });
});

router.post('/reset', (req, res) => {
  SMTPMailers.clearAll()
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
