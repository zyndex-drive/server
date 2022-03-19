import type { Document, Model } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * General Function to Clear a Collection by Deleting all the Records
 *
 * @param {Model} model - Mongoose Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export default async function <U extends Document, V extends Model<U>>(
  model: V,
): Promise<IInlineResponse<string>> {
  await model.deleteMany({});
  return {
    success: true,
    data: 'Successfully Cleared the Collection',
    error: null,
  };
}
