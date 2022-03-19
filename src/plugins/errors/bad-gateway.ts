import { BaseError } from '@plugins/errors';

/**
 * Bad Gateway Error Class
 */
export class BadGateway extends BaseError {
  /**
   * No Parameters
   */
  constructor() {
    const errorName = 'Bad Gateway';
    const message = 'Received an Invalid response from the upstream server.';
    super(502, errorName, message);
  }
}
