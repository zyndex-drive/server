import type { Document, Types } from 'mongoose';
import type { IBaseModel } from '../types';
import type { IScopeDoc, IRoleDoc } from '@models/types';
import type { ID } from '@typs/model.objectid';

export interface IPendingUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  message: string;
  roles: [
    {
      scope: ID<IScopeDoc>;
      role: ID<IRoleDoc>;
    },
  ];
  requested_at: number;
  accepted?: boolean;
  accepted_at?: number;
}

export interface IPendingUserDoc extends IPendingUser, Document {}

export interface IPendingUserModel extends IBaseModel<IPendingUserDoc> {}
