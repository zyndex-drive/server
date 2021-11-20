import { Schema } from 'mongoose';
import appendStatics from './statics';
import type { ISMTPMailerDoc, ISMTPMailerModel } from './types';

const schema = new Schema<ISMTPMailerDoc, ISMTPMailerModel>({
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

export default appendStatics(schema);
