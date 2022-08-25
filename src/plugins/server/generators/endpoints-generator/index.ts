import getRoutes from '../../helpers/get-all-routes';
import { okResponse, errorResponseHandler } from '@plugins/server/responses';
import type { Response, IRouter } from 'express';

/** Identify Endpoints in the Route and Creates a Response */
export class EndpointGenerator {
  private response: Response;
  private router: IRouter;

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
  public serve(): void {
    try {
      okResponse(this.response, getRoutes(this.router));
    } catch (e) {
      errorResponseHandler(this.response, e);
    }
  }
}
