import getRoutes from '../helpers/get-all-routes';
import { okResponse } from '@plugins/server/responses';
import type { Response, IRouter } from 'express';
import type { Routes } from '@plugins/server/types';

/** Identify Endpoints in the Route and Creates a Response */
export class EndpointGenerator {
  response: Response;
  router: IRouter;

  /**
   * Creates a Route Containing all the Endpoints in the Server
   *
   * @param {Response} res - Express Response Object
   * @param {IRouter} router - Express Router Object
   */
  constructor(res: Response, router: IRouter) {
    this.response = res;
    this.router = router;
  }

  /**
   * Serve the Endpoints
   */
  serve(): void {
    okResponse<Routes>(this.response, getRoutes(this.router));
  }
}
