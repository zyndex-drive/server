/* eslint-disable quote-props */
import dotProp from 'dot-prop';

import type { IRoleDoc } from '@models/role/types';

export const heirarchy = {
  Viewer: 0,
  'Content Manager': 1,
  Moderator: 2,
  Manager: 3,
};

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
