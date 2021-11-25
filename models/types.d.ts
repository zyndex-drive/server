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
