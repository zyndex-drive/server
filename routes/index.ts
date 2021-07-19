// Initialization
import express from 'express';

// Middlewares
import { checkSecretPass } from '@/middlewares/first-setup';
import setupCheck from '@middlewares/first-setup';

// Routes
import firstSetup from './first-setup';
import policies from './policies';
import roles from './roles';

// Router
const router = express.Router();

// Assign Main Routes
router.use('/setup', [setupCheck, checkSecretPass], firstSetup);
router.use('/policies', policies);
router.use('/roles', roles);

// Default Get
router.get('/', (req, res) => {
  res.send('Init the Server');
});

export default router;
