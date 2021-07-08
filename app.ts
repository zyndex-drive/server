// Initialization
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xssProtect from 'x-xss-protection';

// Database
import mongoose, { Error } from 'mongoose';
import db from '@helpers/db';

// Middlewares
import dbChecker from '@middlewares/dbchecker';
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

// Connect to Datbase
db.connect()
  .then((mongo: typeof mongoose | boolean) => {
    if (mongo) {
      console.log('Database Connected');
    }
  })
  .catch((err: Error) => {
    console.log(`${err.name}: ${err.message}`);
  });

// Use the Router Config from Routes
app.use('/', dbChecker, cors, router);

// Listen to the Port
app.listen(3000);
