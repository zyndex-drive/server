import { BaseError } from '@plugins/errors';

/**
 * Un Authorized Error Class
 */
export class Forbidden extends BaseError {
  /**
   * @param {string} message - Error Message
   */
  constructor(message: string) {
    super(403, 'Forbidden', message);
  }
}
