import { Schema, model } from 'mongoose';
import type { pendingUser as PendingUserType } from '../types/models';

const pendingUserSchema = new Schema<PendingUserType>({
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

const PendingUsers = model<PendingUserType>('PendingUser', pendingUserSchema);
export default PendingUsers;
