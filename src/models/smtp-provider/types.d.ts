import type { Document, Types, LeanDocument } from 'mongoose';
import type { IBaseModel } from '../types';

export interface ISMTPProvider {
  _id: Types.ObjectId;
  name: string;
  alias: string;
  type: string & ('gmail' | 'others');
  smtp: {
    url: string;
    port: number;
  };
  imap: {
    url: string;
    port: number;
  };
  dkim_key?: string | undefined;
  dkim_options?: {
    domain: string;
    key_selector: string;
  };
}

export interface ISMTPProviderDoc extends ISMTPProvider, Document {}

export interface ISMTPProviderModel extends IBaseModel<ISMTPProviderDoc> {}

export type ISMTPProviderLeanDoc = LeanDocument<ISMTPProviderDoc>;
