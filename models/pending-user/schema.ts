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
  },
  email: {
    type: String,
    required: true,
    encrypt: true,
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
    required: true,
  },
});

schema.plugin(cryptoPlugin<IPendingUser, IPendingUserDoc, IPendingUserModel>());
export default appendStatics(schema);
