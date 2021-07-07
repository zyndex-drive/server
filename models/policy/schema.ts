import { Schema } from 'mongoose';
import type { IPolicyDoc } from './types';

export default new Schema<IPolicyDoc>({
  _id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  global_flag: {
    type: Boolean,
    required: true,
  },
  allowed_roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
});
