import type { Document, Model } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

export interface IBaseModel<T, U extends Document> extends Model<U> {
  createDoc: (this: IBaseModel, doc: T) => Promise<U>;
  createMultiDoc: (this: IBaseModel, docs: T[]) => Promise<U[]>;
  clearAll: (this: IBaseModel) => Promise<IInlineResponse<string>>;
}
