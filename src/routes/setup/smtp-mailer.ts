// Initialization
import express from 'express';

// Response Handlers
import {
  createdResponse,
  errorResponseHandler,
} from '@plugins/server/responses';

// Http Error Classes
import { NotFound, BadRequest } from '@plugins/errors';

// Model
import { SMTPMailers, SMTPProviders } from '@models';

// Others
import { objectID, isUndefined } from '@plugins/misc';

// Types
import type { RequestHandler } from 'express';

// Router
const router = express.Router();

interface IRequestSMTPMail {
  name: string;
  email: string;
  password: string;
  type: string & ('gmail' | 'others');
  provider_id: string;
}

router.post('/add', (async (req, res) => {
  try {
    const { name, email, password, type, provider_id }: IRequestSMTPMail =
      req.body;
    if (!isUndefined([name, email, password, type, provider_id])) {
      const smtpProviderDoc = await SMTPProviders.findById(provider_id).exec();
      if (smtpProviderDoc) {
        const newID = objectID();
        const newSmtpMailer = new SMTPMailers({
          _id: newID,
          name,
          email,
          password,
          type,
          provider: smtpProviderDoc._id,
        });
        const newSmtpMailerDoc = await SMTPMailers.create(newSmtpMailer);
        createdResponse(res, newSmtpMailerDoc);
      } else {
        throw new NotFound('SMTP Provider ID Not Found in the Database');
      }
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
