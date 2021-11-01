import db from '@plugins/db';
import type { Server } from 'http';
import { createTerminus, TerminusOptions } from '@godaddy/terminus';

/**
 * Close Database Connection Before Termination of Server
 *
 * @returns {[Promise<void>]} Promise - Closes the Database Connection
 */
function onSignal(): Promise<void> {
  console.log('server is starting cleanup');
  return db.close();
}

/**
 * Server Shutdown Message
 *
 * @returns {Promise<void>} Promise - Console logging Shutdown Message
 */
function onShutdown(): Promise<void> {
  return new Promise<void>((resolve) => {
    console.log('cleanup finished, server is shutting down');
    resolve();
  });
}

/**
 * Creates a Health Check Service When the Server is Terminating
 *
 * @param {Server} server - Http Server Object
 */
function healthCheck(server: Server): void {
  const options: TerminusOptions = {
    onSignal,
    onShutdown,
  };
  createTerminus(server, options);
}

export default healthCheck;
