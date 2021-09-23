import { Schema } from 'mongoose';
import { createDoc, clearAll } from './statics';
import type { IBlacklistedUser, IBlacklistedUserModel } from './types';

const schema = new Schema<IBlacklistedUser, IBlacklistedUserModel>({
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

schema.statics.createDoc = createDoc;
schema.statics.clearAll = clearAll;

export default schema;
