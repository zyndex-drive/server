// Initialization
import express from 'express';

// Response Handlers
import {
  createdResponse,
  errorResponseHandler,
} from '@plugins/server/responses';

// HTTP Error Classes
import { NotFound, BadRequest } from '@plugins/errors';

// Model
import { Scopes, Credentials } from '@models';

// Others
import { objectID, isUndefined } from '@plugins/misc';

// Types
import type { RequestHandler } from 'express';

// Router
const router = express.Router();

router.post('/add', (async (req, res) => {
  try {
    const { name, drive_id, credential_id } = req.body;
    if (!isUndefined([name, drive_id, credential_id])) {
      const idCheck = await Credentials.checkID(credential_id);
      if (idCheck) {
        const newID = objectID();
        const newScope = new Scopes({
          _id: newID,
          name,
          added_at: Date.now(),
          drive_id,
          related_to: [credential_id],
        });
        const savedDoc = await Scopes.create(newScope);
        createdResponse(res, savedDoc.toObject());
      } else {
        throw new NotFound(
          'Credential ID Not found in the Database, Kindly Send the Correct ID',
        );
      }
    } else {
      throw new BadRequest(
        'name, drive_id, credential_id',
        'Request Body as JSON',
      );
    }
  } catch (e) {
    errorResponseHandler(res, e);
  }
}) as RequestHandler);

export default router;
