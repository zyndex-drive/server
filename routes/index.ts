import express from 'express';
import { checkSecretPass } from '@/middlewares/first-setup';
import setupCheck from '@middlewares/first-setup';

// Routes
import firstSetup from './first-setup';
import policies from './policies';

// Router
const router = express.Router();

// Assign Routes
router.use('/setup', [setupCheck, checkSecretPass], firstSetup);
router.use('/policies', policies);

// Default Get
router.get('/', (req, res) => {
  res.send('Init the Server');
});

export default router;
