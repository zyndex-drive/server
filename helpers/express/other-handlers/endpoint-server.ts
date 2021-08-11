import getRoutes from '@/helpers/express/get-all-routes';
import { okResponse } from '@/helpers/express/response-handlers/2XX-response';
import type { Response, IRouter } from 'express';
import type { Routes } from '@/helpers/express/get-all-routes';

export default (res: Response, router: IRouter): void => {
  okResponse<Routes>(res, getRoutes(router));
};
