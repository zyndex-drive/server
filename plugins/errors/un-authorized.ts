import { BaseError } from '@plugins/errors';

/**
 * Bad Request Error Class
 */
export class UnAuthorized extends BaseError {
  /**
   * @param {string} message - Error Message
   */
  constructor(message: string) {
    super(401, 'Unauthorised', message);
  }
}
