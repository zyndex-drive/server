import { Roles } from '@models';
import { Types } from 'mongoose';

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
    const searchParam = {
      _id: { $in: roles.map((role) => Types.ObjectId(String(role))) },
    };
    Roles.find(searchParam)
      .lean()
      .exec()
      .then(resolve)
      .catch((err: MongoError) => {
        reject(new Error(`${err.name}: ${err.message}`));
      });
  });
}
