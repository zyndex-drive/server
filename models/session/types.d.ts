import type { Document, Types } from 'mongoose';
import type { IBaseModel } from '../types';
import type { IUserDoc } from '@models/user/types';
import type { IFrontendDoc } from '@models/frontend/types';
import type { ID } from '@typs/model.objectid';

export interface ISession {
  _id: Types.ObjectId;
  ip: string;
  user_id: ID<IUserDoc>;
  frontend: ID<IFrontendDoc>;
  token_secret: string;
  issued_at: number;
}

export interface ISessionDoc extends ISession, Document {}

export interface ISessionModel extends IBaseModel<ISessionDoc> {}
