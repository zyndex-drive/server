import { Schema, model } from 'mongoose';
import type { blacklistedUser as BlacklistedUserType } from '../types/models';

const blaclistUserSchema = new Schema<BlacklistedUserType>({
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

const BlacklistUsers = model<BlacklistedUserType>(
  'BlacklistedUser',
  blaclistUserSchema,
);
export default BlacklistUsers;
