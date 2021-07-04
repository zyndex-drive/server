import { Schema, model } from 'mongoose';
import type { session as SessionType } from '../types/models';

const SessionSchema = new Schema<SessionType>({
  _id: {
    type: String,
    required: true,
    unique: true,
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

const Sessions = model<SessionType>('Session', SessionSchema);
export default Sessions;
