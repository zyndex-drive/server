// Core
import http from 'http';
import path from 'path';
import express from 'express';

// Exress Middlewares
import bodyparser from 'body-parser';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import requestIp from 'request-ip';
import xssProtect from 'x-xss-protection';
import morgan from 'morgan';
import { dbChecker, cors } from '@plugins/server/middlewares';

// Import Database
import os from 'os';
import { db } from '@plugins';

// Health Checker Service
import { ExpressHealthChecker } from '@plugins/server/generators';

// Passport Import
import { initializePassport } from '@plugins/oauth';

// Router
import router from '@routes';

// Types
import type { Express } from 'express';

/**
 * @class ZyndexServer
 */
export class ZyndexServer {
  app: Express;
  server: http.Server;
  port: string | number;

  /**
   * Initializes and Starts the Zyndex Server
   *
   * @param {number} port - Port Number to start the server
   */
  constructor(port: number | string) {
    this.port = port;
    this.app = express();
    this.initializeMiddlewares();
    this.serveStaticFiles();
    this.assignRouter();
    this.server = this.createHttpServer(this.app);
    this.startHealthChecker();
  }

  /**
   * Initialize Server Middlewares
   */
  initializeMiddlewares(): void {
    this.app.use(bodyparser.json());
    this.app.use(bodyparser.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(xssProtect());
    this.app.use(mongoSanitize());
    this.app.set('trust proxy', true);
    this.app.use(requestIp.mw());
    this.app.use([dbChecker, cors]);
    this.app.use(
      process.env.NODE_ENV === 'production' ? morgan('tiny') : morgan('dev'),
    );
  }

  /**
   * Serve Static Views Folder
   */
  serveStaticFiles(): void {
    this.app.use(
      express.static(
        process.env.NODE_ENV === 'production'
          ? path.join(__dirname, 'views')
          : 'src/views',
      ),
    );
  }

  /**
   * Assign the Server's Default Router
   */
  assignRouter(): void {
    this.app.use('/', router);
  }

  /**
   * Create a Http Server from Express App
   *
   * @param {Express} app - Express App Object
   * @returns {http.Server} server - Http Server
   */
  createHttpServer(app: Express): http.Server {
    return http.createServer(app);
  }

  /**
   * Start the Health Checker Service
   */
  startHealthChecker(): void {
    new ExpressHealthChecker(this.server).start();
  }

  /**
   * Start the Zyndex Server
   */
  start(): void {
    try {
      this.server.listen(this.port, () => {
        console.log(`Environment: ${os.type()}`);
        console.log(`Server Started on Port: ${this.port}`);
        console.log('Connecting to Database.....');

        // Connect to Database
        db.connect()
          .then(() => {
            console.log('Database Connected...OK..');
          })
          .then(() => console.log('Initializing Oauth Clients'))
          .then(() => initializePassport())
          .catch((err: string) => {
            console.log(err);
            this.server.close();
          });
      });
      this.server.once('error', (err) => {
        console.log(
          'There was an error starting the server in the error listener:',
          err,
        );
        this.server.close();
      });
    } catch (e) {
      console.log('There was an error starting the server:', e);
      this.server.close();
    }
  }
}
