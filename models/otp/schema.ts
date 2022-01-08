import { Schema } from 'mongoose';
import appendStatics from './statics';
import type { IOtp, IOtpDoc, IOtpModel } from './types';

const schema = new Schema<IOtpDoc, IOtpModel, IOtp>({
  _id: {
    type: Schema.Types.ObjectId,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  otp: {
    type: String,
    required: true,
    unique: true,
    encrypt: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
  issued_at: {
    type: Number,
    required: true,
    default: Date.now,
  },
  expires_at: {
    type: Number,
    required: true,
    default: Date.now,
  },
  verified_at: {
    type: Number,
    default: Date.now,
  },
});

export default appendStatics(schema);
