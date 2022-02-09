import type { Document, Types, LeanDocument } from 'mongoose';
import type { IBaseModel } from '../types';

export interface ICredentials {
  _id: Types.ObjectId;
  alias: string;
  client_id: string;
  client_secret: string;
  redirect_uri: {
    type: 'login' | 'other';
    uri: string;
  }[];
  type: string;
  login: boolean;
  email: string;
}

export interface ICredentialsDoc extends ICredentials, Document {}

export interface ICredentialsModel extends IBaseModel<ICredentialsDoc> {
  /**
   * Checks the Credentials Collection for the Given ID
   *
   * @param {Types.ObjectId} id - Credential ID String
   * @returns {Promise<boolean>} - Response whether true or false
   */
  checkID: (this: ICredentialsModel, id: Types.ObjectId) => Promise<boolean>;
}

export type ICredentialsLeanDoc = LeanDocument<ICredentialsDoc>;
