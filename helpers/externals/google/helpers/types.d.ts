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
