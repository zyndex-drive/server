import { Roles } from '@models';

import type { Error as MongoError } from 'mongoose';
import type { ID } from '@typs/model.objectid';
import type { IRoleDoc, IRoleLeanDoc } from '@models/types';

/**
 * Retreive Role Documents from Database
 *
 * @param {ID<IRoleDoc>[]} roles - Array of Role ID's to Retrieve
 * @returns {Promise<IRoleLeanDoc[]>} - Array of Role Documents
 */
export function retreiveRoles(roles: ID<IRoleDoc>[]): Promise<IRoleLeanDoc[]> {
  return new Promise<IRoleLeanDoc[]>((resolve, reject) => {
    const searchParam = roles.map((role) => ({
      _id: role,
    }));
    Roles.find({ $or: searchParam })
      .lean()
      .exec()
      .then(resolve)
      .catch((err: MongoError) => {
        reject(new Error(`${err.name}: ${err.message}`));
      });
  });
}
