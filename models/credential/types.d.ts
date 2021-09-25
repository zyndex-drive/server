import type { Document, Model, Types } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

export interface ICredentials {
  _id: Types.ObjectId;
  alias: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  email: string;
}

export interface ICredentialsDoc extends ICredentials, Document {}

export interface ICredentialsModel extends Model<ICredentialsDoc> {
  createDoc: (
    this: ICredentialsModel,
    doc: ICredentials,
  ) => Promise<ICredentialsDoc>;
  clearAll: (this: ICredentialsModel) => Promise<IInlineResponse<string>>;
  checkID: (this: ICredentialsModel, id: Types.ObjectId) => Promise<boolean>;
}
