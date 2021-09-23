// Initialization
import express from 'express';

// Google Oauth
import generateOauth from '@/helpers/externals/google/generate-oauth';

// Google Drive
import tokenResolver from '@google/helpers/resolve-token';
import driveScopes from '@helpers/externals/drive/scopes';
import { Credentials } from '@models';

// Router
const router = express.Router();

// Google Oauth Login Route
router.get('/auth/', (req, res) => {
  generateOauth(req, res, driveScopes);
});

router.post('/sample/', (req, res) => {
  Credentials.find({})
    .then((result) => {
      tokenResolver(result[0]._id, driveScopes)
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
