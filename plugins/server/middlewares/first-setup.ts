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

// Response Handlers
import { errorResponseHandler } from '@plugins/server/responses';

// Http Error Classes
import { BadRequest, UnAuthorized, InternalServerError } from '@plugins/errors';

// Type Imports
import { Request, Response, NextFunction } from 'express';
import { Error as MongoError, Model } from 'mongoose';
import { map as roleMap } from '@plugins/templates/roles';
import { map as policyMap } from '@plugins/templates/policies';

// Model Type Imports
import {
  ICredentials,
  ICredentialsDoc,
  ICredentialsModel,
  IFrontend,
  IFrontendDoc,
  IFrontendModel,
  IUser,
  IUserDoc,
  IUserModel,
  IScope,
  IScopeDoc,
  IScopeModel,
  IGlobalSettings,
  IGlobalSettingsDoc,
  IGlobalSettingsModel,
  IRole,
  IRoleDoc,
  IRoleModel,
  IPolicy,
  IPolicyDoc,
  IPolicyModel,
} from '@models/types';

/**
 * Checks the Given DB whether it has any Doc Present and if map is Present, Checks with the map length
 *
 * @param {Model} db - Model to Search the Records
 * @param {map} map - Map to Compare the Records
 * @returns {Promise<boolean>} - Returns whether true or false
 */
async function checkDBPresent<INTERFACE, DOC, MODEL extends Model<DOC>>(
  db: MODEL,
  map?: Readonly<INTERFACE>[],
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    const collections = db.find({}).lean().exec();
    collections
      .then((result) => {
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
          reject(
            new InternalServerError('Unknown Error while Querying Collection'),
          );
        }
      })
      .catch((e: MongoError) => {
        reject(new InternalServerError(e.message, e.name));
      });
  });
}

/**
 * Checks Whether all the Database Collections are Properly Setup and allows the Setup Route
 *
 * @param {Request} req - Express Request Object
 * @param {Response} res - Express Response Object
 * @param {NextFunction} next - Express Next Function
 */
async function checkSetupStatus(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const promises = [
      checkDBPresent<ICredentials, ICredentialsDoc, ICredentialsModel>(
        Credentials,
      ),
      checkDBPresent<IFrontend, IFrontendDoc, IFrontendModel>(Frontends),
      checkDBPresent<IPolicy, IPolicyDoc, IPolicyModel>(Policies, policyMap),
      checkDBPresent<IRole, IRoleDoc, IRoleModel>(Roles, roleMap),
      checkDBPresent<IGlobalSettings, IGlobalSettingsDoc, IGlobalSettingsModel>(
        GlobalSettings,
      ),
      checkDBPresent<IScope, IScopeDoc, IScopeModel>(Scopes),
      checkDBPresent<IUser, IUserDoc, IUserModel>(Users),
    ];
    const setups = await Promise.all(promises);
    if (setups.includes(false)) {
      res.locals.setups = true;
      next();
    } else {
      res.status(200).json({
        success: true,
        setup: true,
        message: 'All the Collections have been Setup Correctly',
      });
    }
  } catch (e) {
    errorResponseHandler(res, e);
  }
}

export default checkSetupStatus;

/**
 * Validates the Given Secret with Environment Secret for Setting Up First Time Data
 *
 * @param {Request} req - Express Request Object
 * @param {Response} res - Express Response Object
 * @param {NextFunction} next - Express NextFunction
 */
export function checkSecretPass(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    const secret = process.env.SECRET;
    if (secret) {
      const headerPass = req.headers['x-secret-pass'];
      if (headerPass && typeof headerPass === 'string') {
        const correctedSecret = secret.toLowerCase();
        const correctedHeaderPass = headerPass.toLowerCase();
        if (correctedHeaderPass === correctedSecret) {
          res.locals.secretcheck = true;
          next();
        } else {
          throw new UnAuthorized(
            'Header Secret is Not Matching with the Environment Secret, Kindly Send the Correct Pass',
          );
        }
      } else {
        throw new BadRequest('x-secret-pass', 'Request Headers');
      }
    } else {
      throw new InternalServerError(
        'No Secret Set in the Environment, Kindly Set in Vars',
        'Secret Error',
      );
    }
  } catch (e) {
    errorResponseHandler(res, e);
  }
}
