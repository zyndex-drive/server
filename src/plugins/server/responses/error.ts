import sendResponse from '../helpers/send-response';
import { BaseError, InternalServerError } from '@plugins/errors';

// Types
import type { Response } from 'express';
import type { IErrorResponse } from '@plugins/server/types';

/**
 * Send a Error Response to Client
 *
 * @param {Response} res - Express Response Object
 * @param {BaseError} error - Error Class which Extends BaseError from Plugins
 * @param {any} data - Data if any to be passed with the error response
 */
function errorResponse(res: Response, error: BaseError, data?: unknown): void {
  const errorResponse: IErrorResponse = {
    status: error.status,
    errorname: error.errorname,
    message: error.message,
    data,
  };
  sendResponse<IErrorResponse>(res, error.status, errorResponse);
}

/**
 * Send a Error Response to Client when the Error is Unknown
 *
 * @param {Response} res - Express Response Object
 * @param {any} error - error object from catch block
 * @param {any} data - Data if any to be passed with the error response
 */
export function errorResponseHandler(
  res: Response,
  error: unknown,
  data?: unknown,
): void {
  if (error instanceof BaseError) {
    errorResponse(res, error, data);
  } else if (error instanceof Error) {
    const serverError = new InternalServerError(error.message, error.name);
    errorResponse(res, serverError, data);
  } else {
    const serverError = new InternalServerError(
      'Unknown Error in the Server, Try Again later',
    );
    errorResponse(res, serverError, data);
  }
}
