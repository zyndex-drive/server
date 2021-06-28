import { Schema, model } from 'mongoose';
import { session as SessionType } from '../types/models';

const SessionSchema = new Schema<SessionType>({
  sId: {
    type: Number,
    required: true,
    unique: true,
  },
  ip: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
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
    default: Date.now(),
  },
});

const Session = model('Session', SessionSchema);

export default Session;
