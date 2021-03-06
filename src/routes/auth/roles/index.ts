// Initialization
import express from 'express';

// Models
import { Roles } from '@models';

// Auth Helpers
import { roles as rolesAuth } from '@plugins/auth';

// Response Handlers
import { okResponse, errorResponseHandler } from '@plugins/server/responses';

// Types
import type { RequestHandler } from 'express';
import type { IRole, IRoleDoc, IRoleLeanDoc } from '@models/types';
import { ExpressDatabaseHandler } from '@plugins/server/generators';

// Router
const router = express.Router();

// Express Handlers
const expressRoleDatabaseHandler = new ExpressDatabaseHandler<
  IRole,
  IRoleDoc,
  IRoleLeanDoc
>(Roles, true);

router.post('/list', (async (req, res) => {
  try {
    const roles = await Roles.find({}).lean();
    okResponse(res, roles);
  } catch (e) {
    errorResponseHandler(res, e);
  }
}) as RequestHandler);

router.post(
  '/update',
  (async (req, res) =>
    await expressRoleDatabaseHandler.editDatabaseHandler(
      req,
      res,
      {
        bodyProp: 'rolesToUpdate',
        modelName: 'Role',
      },
      rolesAuth.edit,
    )) as RequestHandler,
);

export default router;
