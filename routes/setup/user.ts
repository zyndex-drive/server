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
import { Users, Scopes, Roles } from '@models';

// Others
import { EndpointGenerator } from '@plugins/server/generators';
import { generateUID, objectID, isUndefined } from '@plugins/misc';

// Types
import { Error as MongoError } from 'mongoose';
import { IUser, IUserLeanDoc } from '@models/types';
import { IInlineResponse } from '@typs/inline.response';

const router = express.Router();
const AVATAR_DEFAULT =
  'https://unsplash.com/photos/saRKnTHBEhU/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8Z3JhcGhpY3x8MHwyfHx8MTY0MTY0MTAzMw&force=true&w=640';

interface IRequestUserData {
  name: string;
  email: string;
  avatar: string;
  password: string;
  scope_id: string;
}

router.post('/add', (req, res) => {
  Users.find({})
    .lean()
    .exec()
    .then((userDocs) => {
      if (userDocs.length > 0) {
        okResponse<string>(res, 'Only one Owner can be Added in the Database');
      } else {
        const { name, email, avatar, password }: IRequestUserData = req.body;
        if (!isUndefined([name, email, password])) {
          Scopes.find({})
            .lean()
            .exec()
            .then((scopeDocs) =>
              Promise.all([
                scopeDocs,
                Roles.findOne({ type: 'main', name: 'Owner' }).lean().exec(),
              ]),
            )
            .then(([scopeDocs, roleDoc]) => {
              if (scopeDocs.length > 0 && roleDoc) {
                const newId = objectID('u');
                const token_hash = generateUID();
                const newUser: IUser = {
                  _id: newId,
                  name,
                  email,
                  password,
                  avatar: avatar ? avatar : AVATAR_DEFAULT,
                  registered_at: Date.now(),
                  restricted: false,
                  roles: [
                    ...scopeDocs.map((scope) => ({
                      scope: scope._id,
                      role: roleDoc._id,
                    })),
                  ],
                  verified_at: Date.now(),
                  token_hash,
                };
                const newUserDoc = new Users(newUser);
                newUserDoc
                  .save()
                  .then((userDoc) => {
                    createdResponse<IUserLeanDoc>(res, userDoc.toObject());
                  })
                  .catch((err: MongoError) => {
                    internalServerError(res, err.name, err.message);
                  });
              } else {
                notFound(res, 'Scope Id and Roles Not Found in the Database');
              }
            })
            .catch((err: MongoError) => {
              internalServerError(res, err.name, err.message);
            });
        } else {
          badRequest(res, 'name, email, password', 'Request');
        }
      }
    })
    .catch((err: MongoError) => {
      internalServerError(res, err.name, err.message);
    });
});

router.post('/get', (req, res) => {
  Users.find({})
    .lean()
    .exec()
    .then((userDocs) => {
      okResponse<IUserLeanDoc[]>(res, userDocs);
    })
    .catch((err: MongoError) => {
      internalServerError(res, err.name, err.message);
    });
});

router.post('/reset', (req, res) => {
  Users.clearAll()
    .then((result) => {
      okResponse<IInlineResponse<string>>(res, result);
      res.status(200).json(result);
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
