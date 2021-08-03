import type { Document, Model } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

export interface ICredentials {
  _id: string;
  alias: string;
  client_id: string;
  client_secret: string;
  email: string;
}

export interface ICredentialsDoc extends ICredentials, Document {}

export interface ICredentialsModel extends Model<ICredentialsDoc> {
  createDoc: (
    this: ICredentialsModel,
    doc: ICredentials,
  ) => Promise<ICredentialsDoc>;
  clearAll: (this: ICredentialsModel) => Promise<IInlineResponse<string>>;
  checkID: (this: ICredentialsModel, id: string) => Promise<boolean>;
}
