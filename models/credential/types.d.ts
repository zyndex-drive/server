import type { Document, Types } from 'mongoose';
import type { IBaseModel } from '../types';

export interface ICredentials {
  _id: Types.ObjectId;
  alias: string;
  /**
   * Client ID of the User Credential.
   *
   * @type {string}
   */
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  email: string;
}

export interface ICredentialsDoc extends ICredentials, Document {}

export interface ICredentialsModel
  extends IBaseModel<ICredentials, ICredentialsDoc> {
  /**
   * Checks the Credentials Collection for the Given ID
   *
   * @param {Types.ObjectId} id - Credential ID String
   * @returns {Promise<boolean>} - Response whether true or false
   */
  checkID: (this: ICredentialsModel, id: Types.ObjectId) => Promise<boolean>;
}
