// Initialization
import express from 'express';

// Google Oauth
import generateOauth from '@/helpers/externals/google/generate-oauth';

// Google Drive
import driveScopes from '@helpers/externals/drive/scopes';

// Router
const router = express.Router();

router.use('/auth', (req, res) => {
  generateOauth(req, res, 'supercool', driveScopes);
});

export default router;
