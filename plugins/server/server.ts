// Initialization
import http from 'http';
import express from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xssProtect from 'x-xss-protection';

// Middlewares
import dbChecker from '@plugins/server/middlewares/dbchecker';
import cors from '@plugins/server/middlewares/cors';

// Router
import router from '@routes';

// Express config
const app = express();
app.use(express.json({ limit: '50kb' }));
app.use(helmet());
app.use(xssProtect());
app.use(mongoSanitize());
app.use([dbChecker, cors]);

// Use the Router Config from Routes
app.use('/', router);

// Create http server from express
const server = http.createServer(app);

// Export Server
export default server;
