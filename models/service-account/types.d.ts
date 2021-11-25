import type { Document, Types } from 'mongoose';
import type { IBaseModel } from '../types';
import type { ICredentialsDoc } from '@models/credential/types';
import type { ID } from '@typs/model.objectid';

export interface IServiceAcc {
  _id: Types.ObjectId;
  project_id: string;
  unique_id: string;
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

export interface IServiceAccModel extends IBaseModel<IServiceAccDoc> {}
