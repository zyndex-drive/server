// Initialization
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xssProtect from 'x-xss-protection';

// Middlewares
import origin from './middlewares/check-origin';

dotenv.config();

// Express config
const app = express();
app.use(express.json({ limit: '50kb' }));
app.use(helmet());
app.use(xssProtect());
app.use(mongoSanitize());
app.use(origin);

app.get('/', (req, res) => {
  res.send('Init the Server');
});

app.listen(3000, () => {
  console.log('started');
});
