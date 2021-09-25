import type { ITokenDoc } from '@models/tokens/types';
import type { IServiceAccDoc } from '@models/service-account/types';
import type { ICredentialsDoc } from '@models/credential/types';

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

export type TGooGScope = `https://www.googleapis.com/auth/${string}`;

export interface IGoogTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  token_type: string;
}
