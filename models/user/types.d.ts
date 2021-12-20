import type { Document, Types } from 'mongoose';
import type { IBaseModel } from '../types';
import type { IRoleDoc } from '@models/role/types';
import type { IPolicyDoc } from '@models/policy/types';
import type { IScopeDoc } from '@models/scope/types';
import type { ID } from '@typs/model.objectid';

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  avatar: string;
  registered_at: number;
  verified_at: number;
  token_hash: string;
  restricted: boolean;
  role: [
    {
      scope: ID<IScopeDoc>;
      role: ID<IRoleDoc>;
    },
  ];
  password: string;
  allowed_policies?: ID<IPolicyDoc>[];
  disallowed_policies?: ID<IPolicyDoc>[];
}

export interface IUserDoc extends IUser, Document {}

export interface IUserModel extends IBaseModel<IUserDoc> {}
