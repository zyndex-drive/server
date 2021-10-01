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
    access: ITokenDoc[];
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
  token_type: string;
}

export interface IGoogleResponse {
  success: boolean;
  data?: unknown;
  error?: unknown;
}

export interface IGoogleRequest {
  get: <T extends string>(
    api: T,
    token: ITokenDoc,
    params?: Record<string, string | number | boolean>,
    headers?: Record<string, string>,
  ) => Promise<IGoogleResponse>;
  post: <T extends string>(
    api: T,
    token: ITokenDoc,
    data?: Record<string, string | number | boolean>,
    headers?: Record<string, string>,
  ) => Promise<IGoogleResponse>;
}
