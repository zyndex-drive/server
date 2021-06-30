import { Schema, model } from 'mongoose';
import { blacklistedUser as BlacklistedUserType } from '../types/models';

const blaclistUserSchema = new Schema<BlacklistedUserType>({
  _id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  blacklisted_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
    unique: true,
  },
  flagged_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
});

const BlacklistUsers = model('Credential', blaclistUserSchema);
export default BlacklistUsers;
