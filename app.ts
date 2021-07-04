// Initialization
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xssProtect from 'x-xss-protection';

// Middlewares
import cors from '@middlewares/cors';

// Router
import router from '@routes';

// Load ENV Variables to the Process
dotenv.config();

// Express config
const app = express();
app.use(express.json({ limit: '50kb' }));
app.use(helmet());
app.use(xssProtect());
app.use(mongoSanitize());
app.use(cors);

// Use the Router Config from Routes
app.use('/', router);

// Listen to the Port
app.listen(3000, () => {
  console.log('started');
});
