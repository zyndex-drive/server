import { Schema } from 'mongoose';
import { createDoc, clearAll } from './statics';
import type { IPendingUserDoc, IPendingUserModel } from './types';

const schema = new Schema<IPendingUserDoc, IPendingUserModel>({
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

schema.statics.createDoc = createDoc;
schema.statics.clearAll = clearAll;

export default schema;
