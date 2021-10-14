// Initialization
import express from 'express';

// Google Oauth
import { normalAccountHandler, oauthHelpers } from '@google';

// Google API Methods
import { iam } from '@google/api';

// Google Drive
import { oauthScopes } from '@google';
import { Credentials } from '@models';

// Router
const router = express.Router();

// Google Oauth Login Route
router.get('/auth/', (req, res) => {
  normalAccountHandler.generateOauth(req, res, [
    ...oauthScopes.drive,
    ...oauthScopes.iam,
  ]);
});

router.post('/sample/', (req, res) => {
  Credentials.find({})
    .then((result) => {
      oauthHelpers
        .resolveToken(result[0]._id, [...oauthScopes.drive, ...oauthScopes.iam])
        .then((result) => {
          iam.projects
            .list(result.tokens[0])
            .then((res2) => {
              res.json({ res2, result });
            })
            .catch((err) => {
              res.send(err);
            });
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
