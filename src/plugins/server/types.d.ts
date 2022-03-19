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
}
