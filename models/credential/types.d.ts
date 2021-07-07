import type { Document, Model } from 'mongoose';

export interface ICredentials {
  _id: string;
  alias: string;
  client_id: string;
  client_secret: string;
  email: string;
}

export interface ICredentialsDoc extends ICredentials, Document {}

export interface ICredentialsModel extends Model<ICredentials> {}
