import type { Document, Model, Types } from 'mongoose';
import type { IRoleDoc } from '@models/role/types';
import type { IPolicyDoc } from '@models/policy/types';
import type { IScopeDoc } from '@models/scope/types';
import type { ID } from '@typs/model.objectid';
import type { IInlineResponse } from '@typs/inline.response';

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  avatar: string;
  registered_at: Date;
  verified_at: Date;
  token_hash: string;
  restricted: boolean;
  role: [
    {
      scope: ID<IScopeDoc>;
      role: ID<IRoleDoc>;
    },
  ];
  password: string;
  allowed_policies: ID<IPolicyDoc>[];
  disallowed_policies: ID<IPolicyDoc>[];
}

export interface IUserDoc extends IUser, Document {}

export interface IUserModel extends Model<IUserDoc> {
  createDoc: (this: IUserModel, doc: IUser) => Promise<IUserDoc[]>;
  clearAll: (this: IUserModel) => Promise<IInlineResponse<string>>;
}
