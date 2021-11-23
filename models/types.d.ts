import type { Document, Model } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

export interface IBaseModel<T, U extends Document> extends Model<U> {
  /**
   * Create a Single Document and Save it to Database
   *
   * @param {Document} doc - Data to be Saved
   * @returns {Promise<Document>} - Promise of the Document
   */
  createDoc: (this: IBaseModel, doc: T) => Promise<U>;

  /**
   * Create Multiple Documents and Save it to Database
   *
   * @param {Document} docs - Array of Objects to be Saved
   * @returns {Promise<Document>} - Promise of the Documents
   */
  createMultiDoc: (this: IBaseModel, docs: T[]) => Promise<U[]>;

  /**
   * Delete all Documents in a Collection
   *
   * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
   */
  clearAll: (this: IBaseModel) => Promise<IInlineResponse<string>>;
}
