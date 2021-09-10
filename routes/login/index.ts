// Initialization
import express from 'express';

// Routes
import google from './google';

// Router
const router = express.Router();

// Assign Login Routes
router.use('/google/', google);

export default router;
