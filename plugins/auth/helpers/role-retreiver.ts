import { Roles } from '@models';

import type { Error as MongoError } from 'mongoose';
import type { ID } from '@typs/model.objectid';
import type { IRoleDoc } from '@models/role/types';

/**
 * Retreive Role Documents from Database
 *
 * @param {ID<IRoleDoc>[]} roles - Array of Role ID's to Retrieve
 * @returns {Promise<IRoleDoc[]>} - Array of Role Documents
 */
export function retreiveRoles(roles: ID<IRoleDoc>[]): Promise<IRoleDoc[]> {
  return new Promise<IRoleDoc[]>((resolve, reject) => {
    const searchParam = roles.map((role) => ({
      _id: role,
    }));
    Roles.find({ $or: searchParam })
      .then(resolve)
      .catch((err: MongoError) => {
        reject(new Error(`${err.name}: ${err.message}`));
      });
  });
}
