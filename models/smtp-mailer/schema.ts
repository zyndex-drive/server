import { Schema } from 'mongoose';
import { createDoc, clearAll } from './statics';
import type { ISMTPMailer, ISMTPMailerModel } from './types';

const schema = new Schema<ISMTPMailer, ISMTPMailerModel>({
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

schema.statics.createDoc = createDoc;
schema.statics.clearAll = clearAll;

export default schema;
