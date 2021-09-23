/**
 * Modified Version of Get-routes Npm Package to Support Express Router Object instead of Express App Object
 * Credits to Original Creator
 *
 * @module get-routes npm Package
 * @author Golo Roden <golo.roden@thenativeweb.io>
 * @author Matthias Wagler <matthias.wagler@thenativeweb.io>
 * @author Amin Aghabeiki <amin.aghabeiki@gmail.com>
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable func-style */
import { IRouter } from 'express';

export interface Routes {
  get: string[];
  post: string[];
  put: string[];
  patch: string[];
  delete: string[];
}

// Disable naming convention because fast_slash comes from Express.
const regexPrefixToString = (path: {
  fast_slash: any;
  toString: () => string;
}): string => {
  if (path.fast_slash) {
    return '';
  }

  const match = /^\/\^((?:\\[$()*+./?[\\\]^{|}]|[^$()*+./?[\\\]^{|}])*)\$\//u.exec(
    path.toString().replace('\\/?', '').replace('(?=\\/|$)', '$'),
  );

  if (match) {
    // Unescape characters.
    return match[1].replace(/\\(.)/gu, '$1');
  }

  return '[Unknown path]';
};

const getRoutes = function (app: IRouter): Routes {
  const routes: Routes = {
    get: [],
    post: [],
    put: [],
    patch: [],
    delete: [],
  };

  const processMiddleware = (middleware: any, prefix = ''): void => {
    if (middleware.name === 'router' && middleware.handle.stack) {
      for (const subMiddleware of middleware.handle.stack) {
        processMiddleware(
          subMiddleware,
          `${prefix}${regexPrefixToString(middleware.regexp)}`,
        );
      }
    }

    if (!middleware.route) {
      return;
    }

    const { method } = middleware.route.stack[0];
    const { path } = middleware.route;

    switch (method) {
      case 'get':
        routes.get.push(`${prefix}${path}`);
        break;
      case 'post':
        routes.post.push(`${prefix}${path}`);
        break;
      case 'put':
        routes.put.push(`${prefix}${path}`);
        break;
      case 'patch':
        routes.patch.push(`${prefix}${path}`);
        break;
      case 'delete':
        routes.delete.push(`${prefix}${path}`);
        break;
      default:
        throw new Error(`Invalid method ${method}.`);
    }
  };

  for (const middleware of app.stack) {
    processMiddleware(middleware);
  }

  return routes;
};

export default getRoutes;
