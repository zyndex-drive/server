// Core
import http from 'http';
import path from 'path';
import express from 'express';
import fs from 'fs';
import { DateTime } from 'luxon';

// Exress Middlewares
import bodyparser from 'body-parser';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import requestIp from 'request-ip';
import xssProtect from 'x-xss-protection';
import morgan from 'morgan';
import { logger } from '@plugins';
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
  public app: Express;
  public server: http.Server;
  private port: string | number;

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
   *
   */
  private prepareLoggerMiddleware(): void {
    morgan.token('date', () => {
      const dateTime = DateTime.now();
      return DateTime.local(
        dateTime.year,
        dateTime.month,
        dateTime.day,
        dateTime.hour,
        dateTime.minute,
        dateTime.second,
        dateTime.millisecond,
      ).toFormat('yyyy-MM-dd HH:mm:ss');
    });
    morgan.token(
      'appMode',
      () => `zyndex-server:${String(process.env.NODE_ENV)}`,
    );
    morgan.format(
      'zyndexLog',
      ':date [:appMode]:[REQUEST LOG] :method :url :status - :response-time ms',
    );
  }

  /**
   * Initialize Server Middlewares
   */
  private initializeMiddlewares(): void {
    this.app.use(bodyparser.json());
    this.app.use(bodyparser.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(xssProtect());
    this.app.use(mongoSanitize());
    this.app.set('trust proxy', true);
    this.app.use(requestIp.mw());
    this.app.use([dbChecker, cors]);
    this.prepareLoggerMiddleware();
    this.app.use(morgan('zyndexLog'));
    this.app.use(
      morgan('zyndexLog', {
        stream: fs.createWriteStream(
          process.env.NODE_ENV === 'production'
            ? path.resolve(__dirname, 'logs', 'requests.log')
            : path.resolve(__dirname, '../../../logs/requests.log'),
          { flags: 'a' },
        ),
      }),
    );
  }

  /**
   * Serve Static Views Folder
   */
  private serveStaticFiles(): void {
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
  private assignRouter(): void {
    this.app.use('/', router);
  }

  /**
   * Create a Http Server from Express App
   *
   * @param {Express} app - Express App Object
   * @returns {http.Server} server - Http Server
   */
  private createHttpServer(app: Express): http.Server {
    return http.createServer(app);
  }

  /**
   * Start the Health Checker Service
   */
  private startHealthChecker(): void {
    new ExpressHealthChecker(this.server).start();
  }

  /**
   * Start the Zyndex Server
   */
  public start(): void {
    try {
      this.server.listen(this.port, () => {
        logger.info(`Environment: ${os.type()}`);
        logger.info(`Server Started on Port: ${this.port}`);
        logger.info('Connecting to Database.....');

        // Connect to Database
        db.connect()
          .then(() => {
            logger.info('Database Connected...OK..');
          })
          .then(() => logger.info('Initializing Oauth Clients'))
          .then(() => initializePassport())
          .then(() => logger.info('Initialized all Available Oauth Clients'))
          .catch((err: string) => {
            logger.error(err);
            this.server.close();
          });
      });
      this.server.once('error', (err) => {
        logger.error(
          'There was an error starting the server in the error listener:',
          err,
        );
        this.server.close();
      });
    } catch (e) {
      logger.error('There was an error starting the server:', e);
      this.server.close();
    }
  }
}
