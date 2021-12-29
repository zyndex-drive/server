import { Schema } from 'mongoose';
import appendStatics from './statics';
import { cryptoPlugin } from '@plugins/db/plugins';
import type { IPendingUser, IPendingUserDoc, IPendingUserModel } from './types';

const schema = new Schema<IPendingUserDoc, IPendingUserModel, IPendingUser>({
  _id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
    encrypt: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  roles: [
    {
      scope: {
        type: Schema.Types.ObjectId,
        ref: 'Scope',
        required: true,
      },
      role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
      },
    },
  ],
  requested_at: {
    type: Number,
    required: true,
    default: Date.now,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  accepted_at: {
    type: Number,
    default: Date.now,
  },
});

schema.plugin(cryptoPlugin<IPendingUser, IPendingUserDoc, IPendingUserModel>());
export default appendStatics(schema);
