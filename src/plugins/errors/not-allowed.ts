import { BaseError } from '@plugins/errors';

/**
 * Not Allowed Error Class
 */
export class NotAllowed extends BaseError {
  /**
   * @param {string} message - Error Message
   */
  constructor(message: string) {
    super(406, 'Not Allowed', message);
  }
}
