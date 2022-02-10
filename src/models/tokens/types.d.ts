import type { Document, Types, LeanDocument } from 'mongoose';
import type { IBaseModel } from '../types';
import type { ID } from '@typs/model.objectid';
import type { IServiceAccDoc, ICredentialsDoc } from '@models/types';

export interface IToken {
  _id: Types.ObjectId;
  token: string;
  type: string;
  related_to: ID<ICredentialsDoc> | ID<IServiceAccDoc> | 'other';
  ref_model: string;
  expires_at: number;
  scopes: string[];
  website: string;
  additional_tokens?: {
    type: string;
    token: string;
  }[];
}

export interface ITokenDoc extends IToken, Document {}

export interface ITokenModel extends IBaseModel<ITokenDoc> {}

export type ITokenLeanDoc = LeanDocument<ITokenDoc>;
