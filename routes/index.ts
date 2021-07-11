import express from 'express';
import { checkSecretPass } from '@/middlewares/first-setup';
import setupCheck from '@middlewares/first-setup';

// Routes
import firstSetup from './first-setup';

// Router
const router = express.Router();

router.use('/setup', [setupCheck, checkSecretPass], firstSetup);

// Default Get
router.get('/', (req, res) => {
  res.send('Init the Server');
});

export default router;
