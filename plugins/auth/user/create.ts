import { Users } from '@models';

import type { Error as MongoError } from 'mongoose';
import type { IUser, IUserDoc } from '@models/user/types';

/**
 * Create a User and Save it to Database
 *
 * @param {IUser} user - User Object containing Details
 * @returns {IUserDoc} - Saved User from Database
 */
export default function (user: IUser): Promise<IUserDoc> {
  return new Promise<IUserDoc>((resolve, reject) => {
    const newUser = new Users(user);
    newUser
      .save()
      .then(resolve)
      .catch((err: MongoError) => {
        reject(new Error(`${err.name}: ${err.message}`));
      });
  });
}
