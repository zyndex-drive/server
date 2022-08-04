import { AxiosError } from 'axios';

export type * from './projects/types';
export type * from './service-account/types';

export interface IIamErrorDetails {
  '@type': string;
  reason: string;
  domain: string;
  metadata: {
    service: string;
  };
}

export interface IIamErrorResponse {
  error: {
    code: number;
    message: string;
    status: string;
    details: IIamErrorDetails[];
  };
}

export type IIamError = AxiosError<IIamErrorResponse>;
