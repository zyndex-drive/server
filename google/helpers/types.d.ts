import type { ITokenDoc } from '@models/tokens/types';
import type { IServiceAccDoc } from '@models/service-account/types';
import type { ICredentialsDoc } from '@models/credential/types';

export type TGoogleApiScope = `https://www.googleapis.com/auth/${string}`;

export interface IGetAllTokens {
  success: boolean;
  error?: unknown;
  credential?: ICredentialsDoc;
  serviceAcc?: IServiceAccDoc[];
  tokens?: {
    access: {
      normal: ITokenDoc[];
      service?: ITokenDoc[];
    };
    refresh: ITokenDoc[];
  };
}

export interface ITokenResolver {
  success: boolean;
  error?: unknown;
  tokens: ITokenDoc[];
}

export interface IGoogTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
  token_type: string;
}

export interface IGoogleResponse<T = Record<unknown, unknown>> {
  success: boolean;
  data?: T;
  error?: unknown;
}

export interface IGoogleRequest {
  get: <T extends string, U = Record<unknown, unknown>>(
    api: T,
    token: ITokenDoc,
    params?: Record<string, string | number | boolean>,
    headers?: Record<string, string>,
  ) => Promise<IGoogleResponse<U>>;
  post: <
    T extends string,
    U = Record<unknown, unknown>,
    V = Record<unknown, unknown>,
  >(
    api: T,
    token: ITokenDoc,
    data?: U,
    params?: Record<string, string>,
    headers?: Record<string, string>,
  ) => Promise<IGoogleResponse<V>>;
  delete: <T extends string, U = Record<unknown, unknown>>(
    api: T,
    token: ITokenDoc,
    data?: Record<string, unknown>,
    headers?: Record<string, string>,
  ) => Promise<IGoogleResponse<U>>;
}
