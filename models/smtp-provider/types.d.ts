import type { Document, Types } from 'mongoose';
import type { IBaseModel } from '../types';

export interface ISMTPProvider {
  _id: Types.ObjectId;
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

export interface ISMTPProviderModel
  extends IBaseModel<ISMTPProvider, ISMTPProviderDoc> {}
