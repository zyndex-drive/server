// Initialization
import express from 'express';

// Response handlers
import {
  okResponse,
  badRequest,
  notFound,
  internalServerError,
  unAuthorized,
} from '@plugins/server/responses';

// Models
import { Users, Frontends } from '@models';

// Routes
import google from './google';

// Others
import { sessionManager } from '@plugins';
import bcrypt from 'bcrypt';

// Types
import type { Error as MongoError } from 'mongoose';

interface ILoginRequest {
  username: string;
  password: string;
  end_id: string;
}

interface ISessionResponse {
  _id: string;
  ip: string;
  user_id: string;
  frontend: string;
  token_secret: string;
  issued_at: number;
  roles: {
    scope: string;
    role: string;
  }[];
}

// Router
const router = express.Router();

// Assign Google Oauth Route
router.use('/google/', google);

// Assign Other Routes
router.post('/user', (req, res) => {
  const { username, password, end_id }: ILoginRequest = req.body;
  if (username && password && end_id) {
    Users.findOne({ email: username })

      .exec()
      .then((userDoc) => {
        if (userDoc) {
          bcrypt
            .compare(password, userDoc.password)
            .then((passwordMatch) => {
              if (passwordMatch) {
                Frontends.findOne({ _id: end_id })

                  .exec()
                  .then((frontendDoc) => {
                    if (frontendDoc) {
                      sessionManager
                        .createSession(req, userDoc, frontendDoc)
                        .then((sessionDoc) => {
                          const sessionResponse: ISessionResponse = {
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
                        })
                        .catch((err: string) => {
                          internalServerError(
                            res,
                            'Internal Server Error',
                            err,
                          );
                        });
                    } else {
                      notFound(res, 'Frontend ID Not Found in the Database');
                    }
                  })
                  .catch((err: MongoError) => {
                    internalServerError(res, err.name, err.message);
                  });
              } else {
                unAuthorized(res, 'Password Not Matching with the Database');
              }
            })
            .catch((err: Error) => {
              internalServerError(res, err.name, err.message);
            });
        } else {
          notFound(res, 'Username Not Found in the Database');
        }
      })
      .catch((err: MongoError) => {
        internalServerError(res, err.name, err.message);
      });
  } else {
    badRequest(res, 'username, password, end_id', 'Request');
  }
});

export default router;
