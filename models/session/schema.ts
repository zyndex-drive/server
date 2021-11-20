import { Schema } from 'mongoose';
import appendStatics from './statics';
import type { ISessionDoc, ISessionModel } from './types';

const schema = new Schema<ISessionDoc, ISessionModel>({
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
  },
  issued_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default appendStatics(schema);
