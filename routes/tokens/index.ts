// Initialization
import express from 'express';

// Google Oauth
import generateOauth from '@/helpers/externals/google/generate-oauth';

// Google Drive
import driveScopes from '@helpers/externals/drive/scopes';

// Router
const router = express.Router();

router.get('/auth', (req, res) => {
  generateOauth(req, res, '634079303228387523707a41', driveScopes);
});

export default router;
