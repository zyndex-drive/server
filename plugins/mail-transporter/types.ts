import type { ITokenDoc, IServiceAccDoc, ICredentialsDoc } from '@models/types';

export interface IMailTokens {
  credentials: ICredentialsDoc;
  tokens: {
    refresh: ITokenDoc[];
    access: ITokenDoc[];
  };
  service_account?: IServiceAccDoc[];
}
