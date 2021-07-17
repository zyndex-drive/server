import sendResponse from './send-response';

// Types
import type { Response } from 'express';
import type { IErrorResponse } from './5XX-response';

/**
 * Send a Bad Request Response to Client
 *
 * @param {Response} res - Express Response Object
 * @param {string} expected - Expected Data which is Missing
 * @param {string} inData - Missing Data in Heirarchy
 */
export function badRequest(
  res: Response,
  expected: string,
  inData: string,
): void {
  const result: IErrorResponse = {
    status: 400,
    errorname: 'Bad Request',
    message: `Expected ${expected} in ${inData}`,
  };
  sendResponse<IErrorResponse>(res, 400, result);
}

/**
 * Send a Unauthorized Response to Client
 *
 * @param {Response} res - Express Response Object
 * @param {string} message - Message to be Sent along with Unauthorized Response
 */
export function unAuthorized(res: Response, message: string): void {
  const result: IErrorResponse = {
    status: 403,
    errorname: 'UnAuthorized',
    message,
  };
  sendResponse<IErrorResponse>(res, 400, result);
}
