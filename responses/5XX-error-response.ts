import type { Response } from 'express';

export interface InternalErrorResponse {
  status: number;
  message: string;
  error: string;
}

/**
 * Sends a Internal Error Response to the Client
 *
 * @param {Response} res - Express Response Object
 * @param {string} [message] Message to be Sent along with 5XX Response (Optional)
 * @param {string} [error] - Error Data to be Sent (Optional)
 */
export function internalServerError(
  res: Response,
  message?: string,
  error?: string,
): void {
  const result: InternalErrorResponse = {
    status: 500,
    message: message ? message : 'Internal Server Error',
    error: error ? error : 'Unknown',
  };
  res.status(500).json(result);
}
