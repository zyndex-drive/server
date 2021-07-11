import type { Document, Model } from 'mongoose';

export interface IPolicy {
  _id: string;
  name: string;
  message: string;
  global_flag: boolean;
}

export interface IPolicyDoc extends IPolicy, Document {}

export interface IPolicyModel extends Model<IPolicyDoc> {
  createPolicy: (this: IPolicyModel, doc: IPolicy) => Promise<IPolicyDoc>;
}
