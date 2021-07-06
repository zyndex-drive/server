// Model Imports
import {
  Credentials,
  Frontends,
  Users,
  Scopes,
  Roles,
  GlobalSettings,
  Policies,
} from '@models';

// Type Imports
import { Request, Response, NextFunction } from 'express';
import { Error, Model } from 'mongoose';
import { map as roleMap } from '@setup/roles';
import { map as policyMap } from '@setup/policies';
import { policySchema } from '@typs/models/policy';
import { roleSchema } from '@typs/models/role';

import {
  credential as CredsType,
  frontend as FendType,
  user as UserType,
  scope as ScopeType,
  globalSettings as GlobalSetType,
  role as RoleType,
  policy as PolicyType,
} from '@typs/models';

/**
 * Checks the Given DB whether it has any Doc Present and if map is Present, Checks with the map length
 *
 * @param {Model} db - Model to Search the Records
 * @param {map} map - Map to Compare the Records
 * @returns {Promise<boolean>} present - Returns whether true or false
 */
async function checkDBPresent<T, O>(
  db: Model<T>,
  map?: Readonly<O>[],
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    const collections = db.find({}).exec();
    collections
      .then((result: T[]) => {
        if (result) {
          if (result.length > 0) {
            if (map) {
              if (map.length === result.length) {
                resolve(true);
              } else {
                resolve(false);
              }
            } else {
              resolve(true);
            }
          } else {
            resolve(false);
          }
        } else {
          reject(new Error('Unknown Error while Querying Collection'));
        }
      })
      .catch((e: Error) => {
        reject(new Error(`${e.name}: ${e.message}`));
      });
  });
}

/**
 * Check Whether all the Database Collections are Properly Setup and allows the Setup Route
 *
 * @param {Request} req - Express Request Object
 * @param {Response} res - Express Response Object
 * @param {NextFunction} next - Express Next Function
 */
function checkSetupStatus(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const promises = [
    checkDBPresent<CredsType, string>(Credentials),
    checkDBPresent<FendType, string>(Frontends),
    checkDBPresent<PolicyType, policySchema>(Policies, policyMap),
    checkDBPresent<RoleType, roleSchema>(Roles, roleMap),
    checkDBPresent<GlobalSetType, string>(GlobalSettings),
    checkDBPresent<ScopeType, string>(Scopes),
    checkDBPresent<UserType, string>(Users),
  ];
  Promise.all(promises)
    .then((setups) => {
      if (setups.includes(false)) {
        next();
      } else {
        res.status(200).json({
          success: true,
          setup: true,
          message: 'All the Collections have been Setup Correctly',
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        setup: false,
        message: err,
      });
    });
}

export default checkSetupStatus;
