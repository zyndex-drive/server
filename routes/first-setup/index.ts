// Initialization
import express from 'express';

// Sub Routes
import policies from './policies';
import roles from './roles';

const router = express.Router();

router.use('/policies', policies);
router.use('/roles', roles);

export default router;
