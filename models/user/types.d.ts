import type { Document, Types, LeanDocument } from 'mongoose';
import type { IBaseModel } from '../types';
import type { IScopeDoc, IPolicyDoc, IRoleDoc } from '@models/types';
import type { ID } from '@typs/model.objectid';

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  avatar: string;
  registered_at: number;
  verified_at: number;
  token_hash: string;
  restricted: boolean;
  oauth_id?: string;
  roles: {
    scope: ID<IScopeDoc>;
    role: ID<IRoleDoc>;
  }[];
  password?: string;
  allowed_policies?: ID<IPolicyDoc>[];
  disallowed_policies?: ID<IPolicyDoc>[];
}

export interface IUserDoc extends IUser, Document {
  /**
   * Verifies the Given Password with that of the Document
   *
   * @async
   * @param {IUserDoc} this - Current User Document
   * @param {string} password - Password Entered by the User
   * @returns {Promise<boolean>} - Password Matches or not
   */
  verifyPassword: (this: IUserDoc, password: string) => Promise<boolean>;
}

export interface IUserModel extends IBaseModel<IUserDoc> {}

export type IUserLeanDoc = LeanDocument<IUserDoc>;
