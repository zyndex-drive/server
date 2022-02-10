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
export function okResponse(res: Response, data: unknown): void {
  const result: ISuccessResponse = {
    status: 200,
    data,
  };
  sendResponse(res, 200, result);
}

/**
 * Send a Created Response to Client with Data
 *
 * @param {Response} res - Express Response Object
 * @param {object} data - Data to be Sent to Client
 */
export function createdResponse(res: Response, data: unknown): void {
  const result: ISuccessResponse = {
    status: 201,
    data,
  };
  sendResponse(res, 201, result);
}
