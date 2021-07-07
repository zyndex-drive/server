import { Schema } from 'mongoose';
import type { IPendingUserDoc } from './types';

export default new Schema<IPendingUserDoc>({
  _id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
  },
  scopes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Scope',
    },
  ],
  requested_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
