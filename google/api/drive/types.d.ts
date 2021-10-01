import type { ITokenDoc } from '@models/tokens/types';

export type TDriveUrlType = `https://www.googleapis.com/drive/v3/${string}`;

export interface IDriveResponse {
  success: boolean;
  data?: unknown;
  error?: unknown;
}

export interface IDriveRequest {
  get: (
    api: TDriveUrlType,
    token: ITokenDoc,
    params?: Record<string, string | number | boolean>,
    headers?: Record<string, string>,
  ) => Promise<IDriveResponse>;
  post: (
    api: TDriveUrlType,
    token: ITokenDoc,
    data?: Record<string, string | number | boolean>,
    headers?: Record<string, string>,
  ) => Promise<IDriveResponse>;
}
