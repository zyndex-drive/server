import express from 'express';

// Routes
import firstSetup from './first-setup';

// Router
const router = express.Router();

router.use('/setup', firstSetup);

// Default Get
router.get('/', (req, res) => {
  res.send('Init the Server');
});

export default router;
