// Initialization
import express from 'express';

// Routes
import google from './google';
import twitter from './twitter';
import github from './github';
import facebook from './facebook';

// Router
const router = express.Router();

// Assign Oauth onboarding Routes
router.use('/google', google);
router.use('/twitter', twitter);
router.use('/facebook', facebook);
router.use('/github', github);

export default router;
