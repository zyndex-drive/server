import type { Document, Types } from 'mongoose';
import type { IBaseModel } from '../types';
import type { IRoleDoc } from '@models/role/types';
import type { IScopeDoc } from '@models/scope/types';
import type { ID } from '@typs/model.objectid';

export interface IPendingUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  message: string;
  role: ID<IRoleDoc>;
  scopes: ID<IScopeDoc>;
  requested_at: Date;
}

export interface IPendingUserDoc extends IPendingUser, Document {}

export interface IPendingUserModel extends IBaseModel<IPendingUserDoc> {}
