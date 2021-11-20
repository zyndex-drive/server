import type { Document, Types } from 'mongoose';
import type { IBaseModel } from '../types';

export interface ICredentials {
  _id: Types.ObjectId;
  alias: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  email: string;
}

export interface ICredentialsDoc extends ICredentials, Document {}

export interface ICredentialsModel
  extends IBaseModel<ICredentials, ICredentialsDoc> {
  checkID: (this: ICredentialsModel, id: Types.ObjectId) => Promise<boolean>;
}
