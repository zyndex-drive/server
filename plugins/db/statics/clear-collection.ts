import type { Document, Model, Error as MongoError } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * General Function to Clear a Collection by Deleting all the Records
 *
 * @param {Model} model - Mongoose Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export default function <U extends Document, V extends Model<U>>(
  model: V,
): Promise<IInlineResponse<string>> {
  return new Promise<IInlineResponse<string>>((resolve, reject) => {
    model
      .deleteMany({})
      .then(
        () =>
          ({
            success: true,
            data: 'Successfully Cleared the Collection',
            error: null,
          } as IInlineResponse<string>),
      )
      .then(resolve)
      .catch((err: MongoError) => {
        reject(new Error(`${err.name}: ${err.message}`));
      });
  });
}
