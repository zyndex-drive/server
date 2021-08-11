// Initialization
import express from 'express';

// Response Handlers
import { okResponse } from '@/helpers/express/response-handlers/2XX-response';
import { internalServerError } from '@/helpers/express/response-handlers/5XX-response';

// Model
import { Roles } from '@models';

// Types
import type { Error as MongoError } from 'mongoose';
import type { IRoleDoc } from '@models/role/types';
import type { IInlineResponse } from '@typs/inline.response';

// Others
import { map as rolesMap } from '@setup/roles';
import endpointServer from '@/helpers/express/other-handlers/endpoint-server';

// Router
const router = express.Router();

router.post('/add', (req, res) => {
  const docs: IRoleDoc[] = [];
  const pushedStatus: boolean[] = [];
  rolesMap.forEach((role) => {
    Roles.createDoc(role)
      .then((doc) => {
        docs.push(doc);
        pushedStatus.push(true);
      })
      .catch((err) => {
        console.log(err);
        pushedStatus.push(false);
      });
  });
  if (pushedStatus.includes(false)) {
    internalServerError(
      res,
      'Database',
      'Some Internal Error Occured, Not all Records have been Added to Database',
    );
  } else {
    okResponse<string>(
      res,
      'Successfully Posted all the Roles Details to Database',
    );
  }
});

router.post('/status', (req, res) => {
  Roles.mapCheck()
    .then((result) => {
      okResponse<IInlineResponse<boolean>>(res, result);
    })
    .catch((error: MongoError) => {
      internalServerError(res, error.name, error.message);
    });
});

router.post('/reset', (req, res) => {
  Roles.clearAll()
    .then((result) => {
      okResponse<IInlineResponse<string>>(res, result);
      res.status(200).json(result);
    })
    .catch((error: MongoError) => {
      internalServerError(res, error.name, error.message);
    });
});

// Respond with all the Endpoints in this Route
router.get('/endpoints', (req, res) => endpointServer(res, router));
router.post('/endpoints', (req, res) => endpointServer(res, router));

export default router;
