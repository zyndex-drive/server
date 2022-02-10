import startServer from './server';
import { server, expressApp } from './server';

export default {
  http: server,
  start: startServer,
  express: expressApp,
};
