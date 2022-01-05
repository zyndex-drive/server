import type { ITokenDoc } from '@models/tokens/types';
import { ICredentialsDoc } from '@models/credential/types';
import { IServiceAccDoc } from '@models/service-account/types';

export interface IMailTokens {
  credentials: ICredentialsDoc;
  tokens: {
    refresh: ITokenDoc[];
    access: ITokenDoc[];
  };
  service_account?: IServiceAccDoc[];
}
