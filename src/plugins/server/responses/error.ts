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
 */
function errorResponse(res: Response, error: BaseError): void {
  const errorResponse: IErrorResponse = {
    status: error.status,
    errorname: error.errorname,
    message: error.message,
  };
  sendResponse<IErrorResponse>(res, error.status, errorResponse);
}

/**
 * Send a Error Response to Client when the Error is Unknown
 *
 * @param {Response} res - Express Response Object
 * @param {any} error - error object from catch block
 */
export function errorResponseHandler(res: Response, error: unknown): void {
  if (error instanceof BaseError) {
    errorResponse(res, error);
  } else if (error instanceof Error) {
    const serverError = new InternalServerError(error.message, error.name);
    errorResponse(res, serverError);
  } else {
    const serverError = new InternalServerError(
      'Unknown Error in the Server, Try Again later',
    );
    errorResponse(res, serverError);
  }
}
