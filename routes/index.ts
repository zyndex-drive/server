import express from 'express';
import { checkSecretPass } from '@/middlewares/first-setup';

// Routes
import firstSetup from './first-setup';

// Router
const router = express.Router();

router.use('/setup', checkSecretPass, firstSetup);

// Default Get
router.get('/', (req, res) => {
  res.send('Init the Server');
});

export default router;
