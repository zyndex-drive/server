import type { Document, Model } from 'mongoose';
import type { ICredentialsDoc } from '@models/credential/types';
import type { ID } from '@typs/model.objectid';

export interface IServiceAcc {
  _id: string;
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

export interface IServiceAccModel extends Model<IServiceAccDoc> {}
