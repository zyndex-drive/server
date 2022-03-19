// Initialization
import http from 'http';
import express from 'express';

// Middlewares
import bodyparser from 'body-parser';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xssProtect from 'x-xss-protection';
import morgan from 'morgan';
import { dbChecker, cors } from '@plugins/server/middlewares';

// Import Server and Database
import os from 'os';
import { db } from '@plugins';

// Health Check Service
import { healthCheckService } from '@plugins/server/helpers';

// Passport Imports
import { initializePassport } from '@plugins/oauth';

// Router
import router from '@routes';

// Express config
const app = express();

// Use Middlewares
app.use(bodyparser.json({ limit: '50kb' }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(helmet());
app.use(xssProtect());
app.use(mongoSanitize());
app.use([dbChecker, cors]);
app.use(process.env.NODE_ENV === 'production' ? morgan('tiny') : morgan('dev'));

// Serve Public Assets
app.use(express.static('src/views'));

// Use the Router Config from Routes
app.use('/', router);

// Create http server from express
export const server = http.createServer(app);

// Start the Health Checker Service
healthCheckService(server);

/**
 * Starts the Zyndex Server
 *
 * @param {string | number} PORT - Port to Start the Server
 */
export default function (PORT: string | number): void {
  try {
    server.listen(PORT, () => {
      console.log(`Environment: ${os.type()}`);
      console.log(`Server Started on Port: ${PORT}`);
      console.log('Connecting to Database.....');

      // Connect to Database
      db.connect()
        .then(() => {
          console.log('Database Connected...OK..');
        })
        .then(() => initializePassport())
        .then(() => console.log('Passport Oauth Clients Initialized'))
        .catch((err: string) => {
          console.log(err);
          server.close();
        });
    });
    server.once('error', (err) => {
      console.log(
        'There was an error starting the server in the error listener:',
        err,
      );
      server.close();
    });
  } catch (e) {
    console.log('There was an error starting the server:', e);
    server.close();
  }
}

export const expressApp = app;
