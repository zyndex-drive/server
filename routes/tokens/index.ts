// Initialization
import express from 'express';

// Google Oauth
import generateOauth from '@/helpers/externals/google/generate-oauth';

// Google Drive
import driveScopes from '@helpers/externals/drive/scopes';

// Router
const router = express.Router();

router.get('/auth', (req, res) => {
  generateOauth(
    req,
    res,
    'creds@eac4ebc910f3a8bbc80230c3f329b752',
    driveScopes,
  );
});

export default router;
