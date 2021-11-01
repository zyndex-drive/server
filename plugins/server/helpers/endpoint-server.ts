import getRoutes from './get-all-routes';
import { okResponse } from '@plugins/server/responses';
import type { Response, IRouter } from 'express';
import type { Routes } from '@plugins/server/types';

export default (res: Response, router: IRouter): void => {
  okResponse<Routes>(res, getRoutes(router));
};
