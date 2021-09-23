import type { Document, Model, Types } from 'mongoose';
import type { IRoleDoc } from '@models/role/types';
import type { IScopeDoc } from '@models/scope/types';
import type { ID } from '@typs/model.objectid';
import type { IInlineResponse } from '@typs/inline.response';

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

export interface IPendingUserModel extends Model<IPendingUserDoc> {
  createDoc: (this: IPendingUserModel) => Promise<IPendingUserDoc[]>;
  clearAll: (this: IPendingUserModel) => Promise<IInlineResponse<string>>;
}
