import type { Document, Types } from 'mongoose';
import type { IBaseModel } from '../types';
import type { ISMTPProviderDoc } from '@models/types';
import type { ID } from '@typs/model.objectid';

export interface ISMTPMailer {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  type: string & ('gmail' | 'others');
  provider: ID<ISMTPProviderDoc>;
  gmail_data?: Record<string, string | number | boolean>;
}

export interface ISMTPMailerDoc extends ISMTPMailer, Document {}

export interface ISMTPMailerModel extends IBaseModel<ISMTPMailerDoc> {}
