import type { Response } from 'express';

/**
 * Send a Response to Client based on the Status Code
 *
 * @param {Response} res - Express Response Object
 * @param {number} status - HTTP Status Code to be Sent
 * @param {object} data - Data to be sent along with the Response
 */
export default function <T>(res: Response, status: number, data: T): void {
  res.status(status).json(data);
}
