// Initialization
import dotenv from 'dotenv';
import http from 'http';
import express from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xssProtect from 'x-xss-protection';

// Database
import mongoose, { Error } from 'mongoose';
import db from '@helpers/db';

// Health Check Service
import healthChecker from '@helpers/health-check';

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
app.use([dbChecker, cors]);

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
app.use('/', router);

// Create http server from express
const server = http.createServer(app);

// Start the Health Checker
healthChecker(server);

// listen to port
const PORT = process.env.PORT;
try {
  server.listen(PORT || 3000, () => {
    console.log('Server Started');
  });
  server.once('error', (err) => {
    console.log(
      'There was an error starting the server in the error listener:',
      err,
    );
  });
} catch (e) {
  console.log('There was an error starting the server:', e);
}
