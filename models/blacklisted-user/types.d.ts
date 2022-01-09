import type { Document, LeanDocument } from 'mongoose';
import type { IBaseModel } from '../types';
import type { IScopeDoc, IUserDoc, IRoleDoc } from '@models/types';
import type { ID } from '@typs/model.objectid';

export interface IBlacklistedUser {
  _id: ID<IUserDoc>;
  name: string;
  email: string;
  blacklisted_from: number;
  role: {
    scope: ID<IScopeDoc>;
    role: ID<IRoleDoc>;
  }[];
  flagged_by: ID<IUserDoc>;
}

export interface IBlacklistedUserDoc extends IBlacklistedUser, Document {}

export interface IBlacklistedUserModel
  extends IBaseModel<IBlacklistedUserDoc> {}

export type IBlacklistedUserLeanDoc = LeanDocument<IBlacklistedUserDoc>;
