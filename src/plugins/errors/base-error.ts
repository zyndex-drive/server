/**
 * Base Error Class
 */
export class BaseError extends Error {
  errorname: string;
  message: string;
  status: number;

  /**
   * @param {number} status - Status Code of the Error
   * @param {string} errorname - Error Name
   * @param {string} message - Error Message
   */
  constructor(status: number, errorname: string, message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.errorname = errorname;
    this.message = message;
    this.status = status;
  }
}
