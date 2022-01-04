import type { Document, Types } from 'mongoose';
import type { IBaseModel } from '../types';
import type { IUserDoc } from '@models/user/types';
import type { ID } from '@typs/model.objectid';

export interface IOtp {
  _id: Types.ObjectId;
  user_id: ID<IUserDoc>;
  user_email: IUserDoc['email'];
  otp: string;
  verified: boolean;
  issued_at: number;
  expires_at: number;
  verified_at: number;
}

export interface IOtpDoc extends IOtp, Document {}

export interface IOtpModel extends IBaseModel<IOtpDoc> {}
