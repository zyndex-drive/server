// Initialization
import express from 'express';

// Response Handlers
import {
  createdResponse,
  errorResponseHandler,
} from '@plugins/server/responses';

// HTTP Error Classes
import { BadRequest } from '@plugins/errors';

// Model
import { SMTPProviders } from '@models';

// Others
import { objectID, isUndefined } from '@plugins/misc';

// Types
import type { RequestHandler } from 'express';

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

router.post('/add', (async (req, res) => {
  try {
    const { name, alias, type, smtp, imap }: IRequestSMTPProvider = req.body;
    if (!isUndefined([name, alias, type, smtp, imap])) {
      const newID = objectID();
      const newSmtpProvider = new SMTPProviders({
        _id: newID,
        name,
        alias,
        type,
        smtp,
        imap,
      });
      const newSmtpProviderDoc = await newSmtpProvider.save();
      createdResponse(res, newSmtpProviderDoc.toObject());
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
