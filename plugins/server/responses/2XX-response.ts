import sendResponse from '../helpers/send-response';

// Types
import type { Response } from 'express';
import type { ISuccessResponse } from '@plugins/server/types';

/**
 * Send a OK Response to Client with Data
 *
 * @param {Response} res - Express Response Object
 * @param {object} data - Data to be Sent to Client
 */
export function okResponse<T>(res: Response, data: T): void {
  const result: ISuccessResponse<T> = {
    status: 200,
    data,
  };
  sendResponse(res, 200, result);
}
