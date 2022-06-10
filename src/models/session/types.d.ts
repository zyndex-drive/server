import type { Document, Types, LeanDocument } from 'mongoose';
import type { IBaseModel } from '../types';
import type { IFrontendDoc, IUserDoc } from '@models/types';
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

export type ISessionLeanDoc = LeanDocument<ISessionDoc>;
