import { Schema } from 'mongoose';
import type { ISMTPMailerDoc } from './types';

export default new Schema<ISMTPMailerDoc>({
  _id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['gmail', 'others'],
    required: true,
  },
  provider: {
    type: Schema.Types.ObjectId,
    ref: 'SMTPProvider',
  },
  gmail_data: {
    type: Object,
  },
});
