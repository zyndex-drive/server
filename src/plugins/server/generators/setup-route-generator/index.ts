import express from 'express';

// Response Handlers
import { okResponse, errorResponseHandler } from '@plugins/server/responses';

// Types
import type { RequestHandler } from 'express';
import type { Document } from 'mongoose';
import type { IBaseModel } from '@models/types';
import type { IRouter } from 'express';

/**
 * Default Express Routes Generator Inside Setup Route
 */
export class SetupGenerator<T extends Document> {
  private router: IRouter;
  private model: IBaseModel<T>;

  /**
   * Default Express Routes Generator Inside Setup Route
   *
   * @param {IBaseModel<Document>} model - Model to be used for executing the queries
   */
  constructor(model: IBaseModel<T>) {
    (this.router = express.Router()), (this.model = model);
  }

  /**
   * Generates the Default get and reset Route for the given model
   *
   * @returns {IRouter} - Express Router Object
   */
  public serve(): IRouter {
    this.router.post('/get', (async (req, res) => {
      try {
        const leanHeader = req.headers['x-lean-doc-request'];
        const leanRequest = leanHeader ? true : false;
        const docs = await this.model.find({}).lean(leanRequest).exec();
        okResponse(res, docs);
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
