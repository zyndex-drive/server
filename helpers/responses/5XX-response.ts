import sendResponse from './send-response';

// Types
import type { Response } from 'express';

export interface IErrorResponse {
  status: number;
  errorname: string;
  message: string;
}

/**
 * Send a Internal Server Error Response to the Client
 *
 * @param {Response} res - Express Response Object
 * @param {string} [errorname] Message to be Sent along with 5XX Response (Optional)
 * @param {string} [message] - Error Data to be Sent (Optional)
 */
export function internalServerError(
  res: Response,
  errorname?: string,
  message?: string,
): void {
  const result: IErrorResponse = {
    status: 500,
    errorname: errorname ? errorname : 'Internal Server Error',
    message: message ? message : 'Unknown',
  };
  sendResponse<IErrorResponse>(res, 500, result);
}

/**
 * Send a Bad Gateway Error Response to Client
 *
 * @param {Response} res - Express Response Object
 */
export function badGateway(res: Response): void {
  const result: IErrorResponse = {
    status: 502,
    errorname: 'Bad Gateway',
    message: 'Received an Invalid response from the upstream server.',
  };
  sendResponse<IErrorResponse>(res, 502, result);
}
