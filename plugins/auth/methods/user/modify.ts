import { Users } from '@models';
import { checkPolicy } from '@plugins/auth/helpers';

import type { IUserDoc } from '@models/user/types';
import type { IPolicy } from '@models/policy/types';

/**
 * Place / Remove Restriction from a User
 *
 * @param {IUserDoc} admin - Admin User with which to Modify
 * @param {Readonly<IPolicy>[]} policies - Modification Policies appliable to the User
 * @param {Object} modifiedUserOptions - Modified User Properties
 * @param {IUserDoc} user - User to be Modified
 * @returns {Promise<boolean>} - Promise resolving to boolean
 */
export default function <T extends Partial<IUserDoc>>(
  admin: IUserDoc,
  policies: Readonly<IPolicy>[],
  modifiedUserOptions: T,
  user: IUserDoc,
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    checkPolicy(policies, admin)
      .then(() => Users.updateOne({ _id: user._id }, modifiedUserOptions))
      .then(() => resolve(true))
      .catch((err: string) => reject(new Error(err)));
  });
}
