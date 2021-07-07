import { Schema } from 'mongoose';
import type { IBlacklistedUserDoc } from './types';

export default new Schema<IBlacklistedUserDoc>({
  _id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  blacklisted_from: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
  },
  flagged_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
