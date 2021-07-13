import type { Document, Model } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

export interface ISMTPProvider {
  _id: string;
  name: string;
  alias: string;
  smtp: {
    url: string;
    port: number;
  };
  imap: {
    url: string;
    port: number;
  };
  dkim_key?: string | undefined;
}

export interface ISMTPProviderDoc extends ISMTPProvider, Document {}

export interface ISMTPProviderModel extends Model<ISMTPProviderDoc> {
  createDoc: (this: ISMTPProviderModel) => Promise<ISMTPProviderDoc[]>;
  clearAll: (this: ISMTPProviderModel) => Promise<IInlineResponse<string>>;
}
