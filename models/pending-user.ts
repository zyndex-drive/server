import { Schema, model } from 'mongoose';
import uid from '../helpers/uid';
import { pendingUser as PendingUserType } from '../types/models';

const pendingUserSchema = new Schema<PendingUserType>({
  _id: {
    type: String,
    required: true,
    unique: true,
    default: () =>
      uid('Pending-Users', 'usr-pnd')
        .then((uid: string) => uid)
        .catch(() => null),
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
  requested_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const PendingUsers = model('PendingUser', pendingUserSchema);
export default PendingUsers;
