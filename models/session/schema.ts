import { Schema } from 'mongoose';
import { createDoc, clearAll } from './statics';
import type { ISession, ISessionModel } from './types';

const schema = new Schema<ISession, ISessionModel>({
  _id: {
    type: String,
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

schema.statics.createDoc = createDoc;
schema.statics.clearAll = clearAll;

export default schema;
