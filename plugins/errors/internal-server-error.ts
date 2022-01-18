import { BaseError } from '@plugins/errors';

/**
 * Internal Server Error Class
 */
export class InternalServerError extends BaseError {
  /**
   * @param {string} message - Error Message
   * @param {string} errorname - Error Name
   */
  constructor(message: string, errorname?: string) {
    const error = errorname ? errorname : 'Internal Server Error';
    super(500, error, message);
  }
}
