// Initialization
import express from 'express';

// Response handlers
import { okResponse, errorResponseHandler } from '@plugins/server/responses';

import { BadRequest, NotFound, UnAuthorized } from '@plugins/errors';

// Models
import { Users, Frontends } from '@models';

// Routes
import google from './google';

// Others
import { sessionManager } from '@plugins';
import bcrypt from 'bcrypt';

// Types
import type { RequestHandler } from 'express';

interface ILoginRequest {
  username: string;
  password: string;
  end_id: string;
}

// Router
const router = express.Router();

// Assign Google Oauth Route
router.use('/google/', google);

// Assign Other Routes
router.post('/user', (async (req, res) => {
  try {
    const { username, password, end_id }: ILoginRequest = req.body;
    if (username && password && end_id) {
      const userDoc = await Users.findOne({ email: username })
        .orFail(() => new NotFound('Username Not Found in the Database'))
        .exec();
      const passwordMatch = await bcrypt.compare(password, userDoc.password);
      if (passwordMatch) {
        const frontendDoc = await Frontends.findOne({ _id: end_id })
          .lean()
          .orFail(() => new NotFound('Frontend ID Not Found in the Database'))
          .exec();
        const sessionDoc = await sessionManager.createSession(
          req,
          userDoc,
          frontendDoc,
        );
        const sessionResponse = {
          _id: String(sessionDoc._id),
          frontend: String(sessionDoc.frontend),
          ip: sessionDoc.ip,
          issued_at: sessionDoc.issued_at,
          token_secret: sessionDoc.token_secret,
          user_id: String(sessionDoc.user_id),
          roles: [
            ...userDoc.roles.map((role) => ({
              role: String(role.role),
              scope: String(role.scope),
            })),
          ],
        };
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
