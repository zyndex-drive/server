import { BaseError } from '@plugins/errors';

/**
 * Not Found Error Class
 */
export class NotFound extends BaseError {
  /**
   * @param {string} message - Error Message
   */
  constructor(message: string) {
    super(404, 'Not Found', message);
  }
}
