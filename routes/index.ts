import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Init the Server');
});

export default router;
