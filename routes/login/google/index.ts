// Initialization
import express from 'express';

// Google Oauth
import { normalAccountHandler, oauthHelpers } from '@google';

// Google Drive
import driveScopes from '@google/api/drive/scopes';
import { Credentials } from '@models';

// Router
const router = express.Router();

// Google Oauth Login Route
router.get('/auth/', (req, res) => {
  normalAccountHandler.generateOauth(req, res, driveScopes);
});

router.post('/sample/', (req, res) => {
  Credentials.find({})
    .then((result) => {
      oauthHelpers
        .resolveToken(result[0]._id, driveScopes)
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          res.send(err);
        });
    })
    .catch((err) => {
      res.send(err);
    });
});

export default router;
