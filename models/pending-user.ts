import { Schema, model } from 'mongoose';
import { pendingUser as PendingUserType } from '../types/models';

const pendingUserSchema = new Schema<PendingUserType>({
  _id: {
    type: String,
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
  role: {
    type: String,
    required: true,
  },
  scopes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Scope',
    },
  ],
});

const PendingUsers = model('PendingUser', pendingUserSchema);
export default PendingUsers;
