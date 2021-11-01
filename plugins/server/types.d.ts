export interface Routes {
  get: string[];
  post: string[];
  put: string[];
  patch: string[];
  delete: string[];
}

export interface ISuccessResponse<T> {
  status: number;
  data: T;
}

export interface IErrorResponse {
  status: number;
  errorname: string;
  message: string;
}
