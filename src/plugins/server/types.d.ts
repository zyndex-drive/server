import { IEditDatabaseResult } from '@plugins/auth/helpers/types';

export interface Routes {
  get: string[];
  post: string[];
  put: string[];
  patch: string[];
  delete: string[];
}

export interface ISuccessResponse {
  status: number;
  data: unknown;
}

export interface IErrorResponse {
  status: number;
  errorname: string;
  message: string;
  data?: unknown;
}

export interface IEditDatabaseResponse {
  recordsUpdated: IEditDatabaseResult[];
  totalRecordsUpdated: number;
  recordsNotUpdated: IEditDatabaseResult[];
  totalRecordsNotUpdated: number;
}
