import { Schema } from 'mongoose';
import appendStatics from './statics';
import type { IBlacklistedUserDoc, IBlacklistedUserModel } from './types';

const schema = new Schema<IBlacklistedUserDoc, IBlacklistedUserModel>({
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

export default appendStatics(schema);
