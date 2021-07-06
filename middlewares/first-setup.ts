import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import {
  Credentials,
  //   Frontends,
  //   Users,
  //   Scopes,
  //   Roles,
  //   Policies,
} from '@models';

import {
  credential as CredsType,
  //   frontend as FendType,
  //   user as UserType,
  //   scope as ScopeType,
  //   role as RoleType,
  //   policy as PolicyType,
} from '@typs/models';

// import { map as roleMap } from '@setup/roles';
// import { map as policyMap } from '@setup/policies';

/**
 * Check Whether all the Database Collections are Properly Setup and if it is,it will not allow the Setup Route
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
  Credentials.find({})
    .then((creds: CredsType[]) => {
      if (creds && creds.length > 0) {
        res.status(200).json({
          success: true,
        });
      } else {
        next();
      }
    })
    .catch((err: Error) => {
      res.send(err);
    });
}

module.exports = checkSetupStatus;
