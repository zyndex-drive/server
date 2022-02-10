import type { Document, Model } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

export interface IBaseModel<U extends Document> extends Model<U> {
  /**
   * Delete all Documents in a Collection
   *
   * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
   */
  clearAll: (this: IBaseModel) => Promise<IInlineResponse<string>>;
}

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
