/* eslint-disable quote-props */
import dotProp from 'dot-prop';
import mathjs from 'mathjs';

import type { IRoleDoc } from '@models/role/types';

export const heirarchy = {
  Viewer: 0,
  'Content Manager': 1,
  Moderator: 2,
  Manager: 3,
};

export const getHeirarchy = (roleDoc: IRoleDoc): number | undefined =>
  dotProp.get(heirarchy, `${roleDoc.name}`);

export const getHighestHeirarchy = (roleDocs: IRoleDoc[]): Promise<IRoleDoc> =>
  new Promise<IRoleDoc>((resolve, reject) => {
    try {
      const heirarchies: { heirarchy: number; doc: IRoleDoc }[] = [];
      roleDocs.forEach((role, index) => {
        const heir: number | undefined = dotProp.get(heirarchy, `${role.name}`);
        if (heir && heir !== undefined) {
          heirarchies.push({ heirarchy: heir, doc: role });
        }
        if (index === roleDocs.length - 1) {
          const roleNumbers = heirarchies.map(
            (heirarchy) => heirarchy.heirarchy,
          );
          const highest: number = mathjs.max(roleNumbers);
          const [highestRoleDoc] = heirarchies.filter(
            (heirarchy) => heirarchy.heirarchy === highest,
          );
          resolve(highestRoleDoc.doc);
        }
      });
    } catch {
      reject(
        new Error(
          'Error while Determining User Heirarchy, Please Try again Later',
        ),
      );
    }
  });

/**
 * Checks Herirarchy of Admin's Role and User's Role for Performing a Action
 *
 * @param {IRoleDoc} adminRole - Admin Base Role Document
 * @param {IRoleDoc} userRole - User Base Role Document
 * @returns {boolean} - true/false
 */
export function heirarchyChecker(
  adminRole: IRoleDoc,
  userRole: IRoleDoc,
): boolean {
  const adminHeirarchy: number | undefined = dotProp.get(
    heirarchy,
    `${adminRole.name}`,
  );
  const userHeirarchy: number | undefined = dotProp.get(
    heirarchy,
    `${userRole.name}`,
  );
  if (adminHeirarchy && userHeirarchy && adminHeirarchy > userHeirarchy) {
    return true;
  }
  return false;
}
