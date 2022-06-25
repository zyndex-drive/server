// Initialization
import express from 'express';

// Models
import { Roles } from '@models';

// Auth Helpers
import { roles as rolesAuth } from '@plugins/auth';

// Response Handlers
import { okResponse, errorResponseHandler } from '@plugins/server/responses';
import { UnAuthorized, BadRequest } from '@plugins/errors';

// Types
import type { RequestHandler } from 'express';
import type { IRole, IRoleDoc, IRoleLeanDoc, IUserDoc } from '@models/types';
import { editDatabaseExpressHandler } from '@plugins/server/generators';

// Router
const router = express.Router();

router.post('/list', (async (req, res) => {
  try {
    const roles = await Roles.find({}).lean();
    okResponse(res, roles);
  } catch (e) {
    errorResponseHandler(res, e);
  }
}) as RequestHandler);

router.post('/add', (async (req, res) => {
  try {
    if (req.user) {
      const user: IUserDoc = req.user;
      const { rolesToAdd }: { rolesToAdd: IRole[] } = req.body;
      if (rolesToAdd) {
        const promises = rolesToAdd.map((roles) => rolesAuth.add(user, roles));
        const roleDocsAdded = await Promise.all(promises);
        okResponse(res, {
          model: 'Roles',
          recordsAdded: roleDocsAdded,
          totalRecordsAdded: roleDocsAdded.length,
        });
      } else {
        throw new BadRequest(
          'rolesToAdd',
          'Request.body.rolesToAdd to be of type IRole[]',
        );
      }
    } else {
      throw new UnAuthorized('User Not found in the Request - Unauthorized');
    }
  } catch (e) {
    errorResponseHandler(res, e);
  }
}) as RequestHandler);

router.post(
  '/update',
  (async (req, res) =>
    await editDatabaseExpressHandler<IRole, IRoleDoc, IRoleLeanDoc>(
      req,
      res,
      Roles,
      true,
      {
        bodyProp: 'rolesToUpdate',
        modelName: 'Role',
      },
      rolesAuth.edit,
    )) as RequestHandler,
);

export default router;
