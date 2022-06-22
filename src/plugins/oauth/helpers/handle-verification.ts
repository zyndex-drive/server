import { Users, Roles, Scopes, GlobalSettings } from '@models';
import { objectID, generateUID } from '@plugins/misc';
import { NotFound, InternalServerError } from '@plugins/errors';

import type { Profile } from 'passport';
import type { IUserDoc } from '@models/types';

const AVATAR_DEFAULT =
  'https://unsplash.com/photos/saRKnTHBEhU/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8Z3JhcGhpY3x8MHwyfHx8MTY0MTY0MTAzMw&force=true&w=640';

export const handleVerification = async (
  userProfile: Profile,
): Promise<IUserDoc> => {
  try {
    const [user, getServerUsernameDoc] = await Promise.all([
      Users.findOne({ oauth_id: userProfile.id }).exec(),
      GlobalSettings.findOne({
        code: 'srvr-usr-name',
      })
        .lean()
        .exec(),
    ]);
    if (getServerUsernameDoc) {
      let serverUsername = getServerUsernameDoc.global_flag;
      serverUsername =
        typeof serverUsername === 'string'
          ? serverUsername
          : String(serverUsername);
      if (user) {
        const email = userProfile.emails
          ? userProfile.emails[0].value
          : `${userProfile.id}@${serverUsername}`;
        const avatar = userProfile.photos
          ? userProfile.photos[0].value
          : AVATAR_DEFAULT;
        user.email = email;
        user.avatar = avatar;
        user.name = userProfile.displayName;
        const updatedDoc = await user.save();
        return updatedDoc;
      } else {
        const roleDoc = await Roles.findOne({
          type: 'main',
          name: 'Viewer',
        }).exec();
        const scopeDocs = await Scopes.find({}).exec();
        if (scopeDocs.length > 0 && roleDoc) {
          const uid = objectID();
          const email = userProfile.emails
            ? userProfile.emails[0].value
            : `${userProfile.displayName}@${serverUsername}`;
          const avatar = userProfile.photos
            ? userProfile.photos[0].value
            : AVATAR_DEFAULT;
          const token_hash = generateUID();
          const user = {
            _id: uid,
            oauth_id: userProfile.id,
            name: userProfile.displayName,
            email,
            avatar,
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
          const userDoc = await new Users(user).save();
          return userDoc;
        } else {
          throw new NotFound('Scope Id and Roles Not Found in the Database');
        }
      }
    } else {
      throw new InternalServerError(
        'Server User name not set in Database, if you are admin please set that, if not please ask your admin to set the username',
      );
    }
  } catch {
    throw new InternalServerError(
      'Error in Resolving User in Passport Handler',
    );
  }
};
