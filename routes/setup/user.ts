// Initialization
import express from 'express';

// Response Handlers
import {
  okResponse,
  createdResponse,
  errorResponseHandler,
} from '@plugins/server/responses';

// Http Error Classes
import { NotFound, BadRequest } from '@plugins/errors';

// Model
import { Users, Scopes, Roles } from '@models';

// Others
import { generateUID, objectID, isUndefined } from '@plugins/misc';

// Types
import { RequestHandler } from 'express';
import { IUser } from '@models/types';

const router = express.Router();
const AVATAR_DEFAULT =
  'https://unsplash.com/photos/saRKnTHBEhU/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8Z3JhcGhpY3x8MHwyfHx8MTY0MTY0MTAzMw&force=true&w=640';

interface IRequestUserData {
  name: string;
  email: string;
  avatar: string;
  password: string;
}

router.post('/add', (async (req, res) => {
  try {
    const userDocs = await Users.find({}).exec();
    if (userDocs.length > 0) {
      okResponse(res, 'Only one Owner can be Added in the Database');
    } else {
      const { name, email, avatar, password }: IRequestUserData = req.body;
      if (!isUndefined([name, email, password])) {
        const scopeDocs = await Scopes.find({});
        const roleDoc = await Roles.findOne({
          type: 'main',
          name: 'Owner',
        }).exec();
        if (scopeDocs.length > 0 && roleDoc) {
          const newId = objectID();
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
          const savedUserDoc = await newUserDoc.save();
          createdResponse(res, savedUserDoc.toObject());
        } else {
          throw new NotFound('Scope Id and Roles Not Found in the Database');
        }
      } else {
        throw new BadRequest('name, email, password', 'Request');
      }
    }
  } catch (e) {
    errorResponseHandler(res, e);
  }
}) as RequestHandler);

export default router;
