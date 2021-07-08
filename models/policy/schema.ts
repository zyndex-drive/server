import { Schema } from 'mongoose';
import type { IPolicy, IPolicyModel } from './types';

export default new Schema<IPolicy, IPolicyModel>({
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
