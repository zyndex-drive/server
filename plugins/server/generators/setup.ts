import express from 'express';

// Response Handlers
import { okResponse, errorResponseHandler } from '@plugins/server/responses';

// Types
import type { RequestHandler } from 'express';
import type { Document } from 'mongoose';
import type { IBaseModel } from '@models/types';
import type { IRouter } from 'express';

/**
 * Super Cool
 */
export class SetupGenerator<T extends Document> {
  router: IRouter;
  model: IBaseModel<T>;

  /**
   * coool
   *
   * @param {IBaseModel<Document>} model - coool
   */
  constructor(model: IBaseModel<T>) {
    (this.router = express.Router()), (this.model = model);
  }

  /**
   * Serves the Purpose
   *
   * @returns {IRouter} - Router
   */
  serve(): IRouter {
    this.router.post('/get', (async (req, res) => {
      try {
        const leanHeader = req.headers['x-lean-doc-request'];
        const leanRequest = leanHeader ? true : false;
        const frontendDocs = await this.model.find({}).lean(leanRequest).exec();
        okResponse(res, frontendDocs);
      } catch (e) {
        errorResponseHandler(res, e);
      }
    }) as RequestHandler);

    this.router.delete('/reset', (async (req, res) => {
      try {
        const result = await this.model.clearAll();
        okResponse(res, result);
      } catch (e) {
        errorResponseHandler(res, e);
      }
    }) as RequestHandler);

    return this.router;
  }
}
