import type {
  ITokenLeanDoc,
  IServiceAccLeanDoc,
  ICredentialsDoc,
} from '@models/types';

export interface IMailTokens {
  credentials: ICredentialsDoc;
  tokens: {
    refresh: ITokenLeanDoc[];
    access: ITokenLeanDoc[];
  };
  service_account?: IServiceAccLeanDoc[];
}
