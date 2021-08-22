import type { Document, Model, Types } from 'mongoose';
import type { ICredentialsDoc } from '@models/credential/types';
import type { ID } from '@typs/model.objectid';
import type { IInlineResponse } from '@typs/inline.response';

export interface IServiceAcc {
  _id: Types.ObjectId;
  project_id: string;
  private_key: {
    id: string;
    key: string;
  };
  client: {
    id: string;
    email: string;
  };
  related_to: ID<ICredentialsDoc>;
}

export interface IServiceAccDoc extends IServiceAcc, Document {}

export interface IServiceAccModel extends Model<IServiceAccDoc> {
  createDoc: (
    this: IServiceAccModel,
    doc: IServiceAcc,
  ) => Promise<IServiceAccDoc[]>;
  clearAll: (this: IServiceAccModel) => Promise<IInlineResponse<string>>;
}
