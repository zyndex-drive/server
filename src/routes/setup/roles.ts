// Initialization
import express from 'express';

// Response Handlers
import {
  okResponse,
  createdResponse,
  errorResponseHandler,
} from '@plugins/server/responses';

// Model
import { Roles } from '@models';

// Types
import type { RequestHandler } from 'express';

// Others
import { map as rolesMap } from '@plugins/templates/roles';

// Router
const router = express.Router();

router.post('/add', (async (req, res) => {
  try {
    await Roles.create(rolesMap);
    createdResponse(
      res,
      'Successfully Posted all the Roles Details to Database',
    );
  } catch (e) {
    errorResponseHandler(res, e);
  }
}) as RequestHandler);

router.post('/status', (async (req, res) => {
  try {
    const result = await Roles.mapCheck();
    okResponse(res, result);
  } catch (e) {
    errorResponseHandler(res, e);
  }
}) as RequestHandler);

export default router;
