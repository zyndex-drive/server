import { BaseError } from '@plugins/errors';

/**
 * Bad Request Error Class
 */
export class BadRequest extends BaseError {
  /**
   * @param {string} expected - Parameters Expected
   * @param {string} inData - in Which Object
   */
  constructor(expected: string, inData: string) {
    const errorName = 'Bad Request';
    const message = `Expected ${expected} in ${inData}`;
    super(400, errorName, message);
  }
}
