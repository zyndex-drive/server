import type { GotReturn } from 'got';
import type {
  ICredentialsDoc,
  IServiceAccLeanDoc,
  ITokenDoc,
  ITokenLeanDoc,
} from '@models/types';

export type TGoogleApiScope =
  | `https://www.googleapis.com/auth/${string}`
  | 'https://mail.google.com/';

export interface IGetAllTokens {
  credential: ICredentialsDoc;
  serviceAcc?: IServiceAccLeanDoc[];
  tokens?: {
    access: {
      normal: ITokenLeanDoc[];
      service?: ITokenLeanDoc[];
    };
    refresh: ITokenLeanDoc[];
  };
}

export interface ITokenResolverDetailed {
  credentials: ICredentialsDoc;
  tokens: {
    refresh: ITokenLeanDoc[];
    access: ITokenLeanDoc[];
  };
  service_account?: IServiceAccLeanDoc[];
}

export interface ITokenResolverSimple {
  credentials: ICredentialsDoc;
  tokens: ITokenLeanDoc[];
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
  patch: <
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
  stream: <T extends string>(
    api: T,
    token: ITokenDoc,
    params?: Record<string, string>,
  ) => GotReturn;
}

export type TGoogleMimeType =
  | 'application/vnd.google-apps.audio'
  | 'application/vnd.google-apps.document'
  | 'application/vnd.google-apps.drive-sdk'
  | 'application/vnd.google-apps.drawing'
  | 'application/vnd.google-apps.file'
  | 'application/vnd.google-apps.folder'
  | 'application/vnd.google-apps.form'
  | 'application/vnd.google-apps.fusiontable'
  | 'application/vnd.google-apps.map'
  | 'application/vnd.google-apps.photo'
  | 'application/vnd.google-apps.presentation'
  | 'application/vnd.google-apps.script'
  | 'application/vnd.google-apps.shortcut'
  | 'application/vnd.google-apps.site'
  | 'application/vnd.google-apps.spreadsheet'
  | 'application/vnd.google-apps.unknown'
  | 'application/vnd.google-apps.video';
