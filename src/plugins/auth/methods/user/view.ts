import { Users, Roles } from '@models';
import { users as UserPolicies } from '@plugins/templates/policies';
import { checkPolicy, getHeirarchy } from '@plugins/auth/helpers';

import type { IUserDoc } from '@models/types';
import type { FilterQuery } from 'mongoose';

/**
 * Retrieve User's Documents
 *
 * @async
 * @param {IUserDoc} admin - Admin User with which to Request Users Data
 * @param {FilterQuery<IUserDoc>} filter - filter for Retrieving Users
 * @returns {IUserDoc[]} - User Documents Matching the Filter
 */
export async function retrieveUsers(
  admin: IUserDoc,
  filter?: FilterQuery<IUserDoc>,
): Promise<IUserDoc[]> {
  let policies = [UserPolicies.view.viewer];
  const { adminRole } = await checkPolicy(policies, admin, true);
  const adminHeirarchy = getHeirarchy(adminRole);
  const roleDocs = await Roles.find({}).lean().exec();
  if (adminHeirarchy) {
    switch (adminHeirarchy) {
      case 1: {
        const [viewerRoleDoc] = roleDocs.filter(
          (role) => role.name === 'Viewer' && role.type === 'main',
        );
        const customFilter = {
          roles: { $elemMatch: { role: viewerRoleDoc._id } },
          ...filter,
        };
        const userDocs = await Users.find(customFilter).exec();
        return userDocs;
      }
      case 2: {
        policies = [UserPolicies.view.viewer, UserPolicies.view.contentMgr];
        await checkPolicy(policies, admin);
        const customRoleDocs = roleDocs.filter(
          (role) =>
            ['Content Manager', 'Viewer'].includes(role.name) &&
            role.type === 'main',
        );
        const customFilter = {
          roles: {
            $elemMatch: {
              $or: customRoleDocs.map((role) => ({ role: role._id })),
            },
          },
          ...filter,
        };
        const userDocs = await Users.find(customFilter).exec();
        return userDocs;
      }
      case 3: {
        policies = [
          UserPolicies.view.viewer,
          UserPolicies.view.contentMgr,
          UserPolicies.view.mods,
        ];
        await checkPolicy(policies, admin);
        const customRoleDocs = roleDocs.filter(
          (role) =>
            ['Moderator', 'Content Manager', 'Viewer'].includes(role.name) &&
            role.type === 'main',
        );
        const customFilter = {
          roles: {
            $elemMatch: {
              $or: customRoleDocs.map((role) => ({ role: role._id })),
            },
          },
          ...filter,
        };
        const userDocs = await Users.find(customFilter).exec();
        return userDocs;
      }
      case 4: {
        policies = [
          UserPolicies.view.viewer,
          UserPolicies.view.contentMgr,
          UserPolicies.view.mods,
          UserPolicies.view.manager,
        ];
        await checkPolicy(policies, admin);
        const userDocs = await Users.find(filter ? filter : {}).exec();
        return userDocs;
      }
    }
    const userDocs = await Users.find(filter ? filter : {}).exec();
    return userDocs;
  } else {
    throw new Error('Not able to Identify the Heirarchy of Admin');
  }
}
