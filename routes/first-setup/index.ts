// Initialization
import express from 'express';

// Sub Routes
import policies from './policies';
import roles from './roles';
import credentials from './credentials';

// Router
const router = express.Router();

// Assign Sub Routes to Setup Route
router.use('/policies', policies);
router.use('/roles', roles);
router.use('/credentials', credentials);

export default router;
