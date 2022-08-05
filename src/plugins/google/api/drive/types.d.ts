import { AxiosError } from 'axios';

export type * from './about/types';
export type * from './drives/types';
export type * from './files/types';
export type * from './permissions/types';

export type TDriveUrlType = `https://www.googleapis.com/drive/v3/${string}`;
export type TDriveUploadUrl =
  'https://www.googleapis.com/upload/drive/v3/files';

export interface IDriveErrorDetails {
  domain: string;
  reason: string;
  message: string;
}

export interface IDriveErrorResponse {
  error: {
    errors: IDriveErrorDetails[];
    code: number;
    message: string;
  };
}

export type IDriveError = AxiosError<IDriveErrorResponse>;
