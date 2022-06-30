import db from '@plugins/db';
import { createTerminus, TerminusOptions } from '@godaddy/terminus';

// Types
import type { Server } from 'http';

/**
 * Creates a Express Health Check Service
 */
export class ExpressHealthChecker {
  server: Server;

  /**
   * Creates a Express Health Check Service
   *
   * @param {Server} server - Http Server Object
   */
  constructor(server: Server) {
    this.server = server;
  }

  /**
   * Close Database Connection Before Termination of Server
   *
   * @returns {[Promise<void>]} Promise - Closes the Database Connection
   */
  onSignal(): Promise<void> {
    console.log('server is starting cleanup');
    return db.close();
  }

  /**
   * Server Shutdown Message
   *
   * @returns {Promise<void>} Promise - Console logging Shutdown Message
   */
  onShutdown(): Promise<void> {
    return new Promise<void>((resolve) => {
      console.log('cleanup finished, server is shutting down');
      resolve();
    });
  }

  /**
   * Starts the Health Checker Service
   */
  start(): void {
    const options: TerminusOptions = {
      onSignal: () => this.onSignal(),
      onShutdown: () => this.onShutdown(),
    };
    createTerminus(this.server, options);
  }
}
