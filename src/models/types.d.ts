import type { Document, Model } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';
import { IBlacklistedUser } from './blacklisted-user/types';
import { ICredentials } from './credential/types';
import { IFrontend } from './frontend/types';
import { IGlobalSettings } from './global-setting/types';
import { IOtp } from './otp/types';
import { IPendingUser } from './pending-user/types';
import { IPolicy } from './policy/types';
import { IRole } from './role/types';
import { IScope } from './scope/types';
import { IServiceAcc } from './service-account/types';
import { ISession } from './session/types';
import { ISMTPMailer } from './smtp-mailer/types';
import { ISMTPProvider } from './smtp-provider/types';
import { ITemplate } from './templates/types';
import { IToken } from './tokens/types';
import { IUser } from './user/types';
import { IKey } from './keys/types';

export interface IBaseModel<U extends Document> extends Model<U> {
  /**
   * Delete all Documents in a Collection
   *
   * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
   */
  clearAll: (this: IBaseModel) => Promise<IInlineResponse<string>>;
}

export type TGenericModelSchema =
  | IBlacklistedUser
  | ICredentials
  | IFrontend
  | IGlobalSettings
  | IOtp
  | IPendingUser
  | IPolicy
  | IRole
  | IScope
  | IServiceAcc
  | ISession
  | ISMTPMailer
  | ISMTPProvider
  | ITemplate
  | IToken
  | IUser
  | IKey;

export * from './blacklisted-user/types';
export * from './credential/types';
export * from './frontend/types';
export * from './global-setting/types';
export * from './otp/types';
export * from './pending-user/types';
export * from './policy/types';
export * from './role/types';
export * from './scope/types';
export * from './service-account/types';
export * from './session/types';
export * from './smtp-mailer/types';
export * from './smtp-provider/types';
export * from './templates/types';
export * from './tokens/types';
export * from './user/types';
export * from './keys/types';
