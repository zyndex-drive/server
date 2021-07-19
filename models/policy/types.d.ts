import type { Document, Model } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

export interface IPolicy {
  _id: string;
  name: string;
  message: string;
  global_flag: boolean;
}

export interface IPolicyDoc extends IPolicy, Document {}

export interface IPolicyModel extends Model<IPolicyDoc> {
  createDoc: (this: IPolicyModel, doc: IPolicy) => Promise<IPolicyDoc>;
  clearAll: (this: IPolicyModel) => Promise<IInlineResponse<string>>;
  mapCheck: (this: IPolicyModel) => Promise<IInlineResponse<boolean>>
}
