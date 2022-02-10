import { Schema } from 'mongoose';
import appendStatics from './statics';
import type { ISession, ISessionDoc, ISessionModel } from './types';

const schema = new Schema<ISessionDoc, ISessionModel, ISession>({
  _id: {
    type: Schema.Types.ObjectId,
  },
  ip: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  frontend: {
    type: Schema.Types.ObjectId,
    ref: 'Frontend',
    required: true,
  },
  token_secret: {
    type: String,
    required: true,
    unique: true,
    encrypt: true,
  },
  issued_at: {
    type: Number,
    required: true,
    default: Date.now,
  },
  expires_at: {
    type: Number,
    required: true,
  },
});

export default appendStatics(schema);
