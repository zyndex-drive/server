import type { ITokenDoc } from '@models/tokens/types';
import type { IServiceAccDoc } from '@models/service-account/types';
import type { ICredentialsDoc } from '@models/credential/types';

export interface IGetAllTokens {
  success: boolean;
  credential?: ICredentialsDoc;
  serviceAcc?: IServiceAccDoc[];
  tokens?: ITokenDoc[];
}

export interface ITokenResolver {
  success: boolean;
  token?: ITokenDoc;
  index?: number;
  available?: boolean;
  cred_data?: IGetAllTokens;
}
