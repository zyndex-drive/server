// Initialization
import express from 'express';

// Response handlers
import { okResponse, errorResponseHandler } from '@plugins/server/responses';

import { BadRequest, NotFound, UnAuthorized } from '@plugins/errors';

// Models
import { Users } from '@models';

// Routes
import google from './google';
import twitter from './twitter';

// Others
import { sessionManager } from '@plugins';

// Types
import type { RequestHandler } from 'express';

interface ILoginRequest {
  email: string;
  password: string;
  end_id: string;
}

// Router
const router = express.Router();

// Assign Oauth onboarding Routes
router.use('/google/', google);
router.use('/twitter', twitter);

// Assign Other Routes
router.post('/user', (async (req, res) => {
  try {
    const { email, password, end_id }: ILoginRequest = req.body;
    if (email && password && end_id) {
      const userDoc = await Users.findOne({ email })
        .orFail(() => new NotFound('Username Not Found in the Database'))
        .exec();
      const passwordMatch = await userDoc.verifyPassword(password);
      if (passwordMatch) {
        const sessionResponse = await sessionManager.createSession(
          req,
          userDoc,
          end_id,
        );
        okResponse(res, sessionResponse);
      } else {
        throw new UnAuthorized('Password Not Matching with the Database');
      }
    } else {
      throw new BadRequest('username, password, end_id', 'Request');
    }
  } catch (e) {
    errorResponseHandler(res, e);
  }
}) as RequestHandler);

export default router;
