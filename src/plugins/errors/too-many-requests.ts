import { BaseError } from '@plugins/errors';

/**
 * Too Many Requests Error Class
 */
export class TooManyRequests extends BaseError {
  /**
   * @param {string} message - Error Message
   */
  constructor(message: string) {
    super(429, 'Too Many Requests', message);
  }
}
