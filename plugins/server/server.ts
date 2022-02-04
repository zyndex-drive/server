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
app.use(express.static('views'));

// Use the Router Config from Routes
app.use('/', router);

// Create http server from express
const server = http.createServer(app);

// Export Server
export default server;
