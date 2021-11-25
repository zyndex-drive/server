import type { Document, Types } from 'mongoose';
import type { IBaseModel } from '../types';
import type { ID } from '@typs/model.objectid';
import type { ICredentialsDoc } from '@models/credential/types';
import type { IServiceAccDoc } from '@models/service-account/types';

export interface IToken {
  _id: Types.ObjectId;
  token: string;
  type: string;
  related_to: ID<ICredentialsDoc> | ID<IServiceAccDoc> | 'other';
  ref_model: string;
  expires_at: number;
  scopes: string[];
  website: string;
  additional_tokens?: [
    {
      type: string;
      token: string;
    },
  ];
}

export interface ITokenDoc extends IToken, Document {}

export interface ITokenModel extends IBaseModel<ITokenDoc> {}
