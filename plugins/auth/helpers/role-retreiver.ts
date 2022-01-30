import { Roles } from '@models';
import { Types } from 'mongoose';

import type { ID } from '@typs/model.objectid';
import type { IRoleDoc, IRoleLeanDoc } from '@models/types';

/**
 * Retreive Role Documents from Database
 *
 * @param {ID<IRoleDoc>[]} roles - Array of Role ID's to Retrieve
 * @returns {Promise<IRoleLeanDoc[]>} - Array of Role Documents
 */
export async function retreiveRoles(
  roles: ID<IRoleDoc>[],
): Promise<IRoleLeanDoc[]> {
  const searchParam = {
    _id: { $in: roles.map((role) => Types.ObjectId(String(role))) },
  };
  const roleDocs = await Roles.find(searchParam).lean().exec();
  return roleDocs;
}
