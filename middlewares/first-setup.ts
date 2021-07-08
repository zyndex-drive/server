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

// Model Type Imports
import { ICredentials, ICredentialsModel } from '@models/credential/types';
import { IFrontend, IFrontendModel } from '@models/frontend/types';
import { IUser, IUserModel } from '@models/user/types';
import { IScope, IScopeModel } from '@models/scope/types';
import {
  IGlobalSettings,
  IGlobalSettingsModel,
} from '@models/global-setting/types';
import { IRole, IRoleModel } from '@models/role/types';
import { IPolicy, IPolicyModel } from '@models/policy/types';

/**
 * Checks the Given DB whether it has any Doc Present and if map is Present, Checks with the map length
 *
 * @param {Model} db - Model to Search the Records
 * @param {map} map - Map to Compare the Records
 * @returns {Promise<boolean>} present - Returns whether true or false
 */
async function checkDBPresent<T, U extends Model<T>>(
  db: U,
  map?: Readonly<T>[],
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
    checkDBPresent<ICredentials, ICredentialsModel>(Credentials),
    checkDBPresent<IFrontend, IFrontendModel>(Frontends),
    checkDBPresent<IPolicy, IPolicyModel>(Policies, policyMap),
    checkDBPresent<IRole, IRoleModel>(Roles, roleMap),
    checkDBPresent<IGlobalSettings, IGlobalSettingsModel>(GlobalSettings),
    checkDBPresent<IScope, IScopeModel>(Scopes),
    checkDBPresent<IUser, IUserModel>(Users),
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
