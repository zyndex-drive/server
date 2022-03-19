import { Schema } from 'mongoose';
import appendStatics from './statics';
import { cryptoPlugin } from '@plugins/db/plugins';
import type { ISMTPMailer, ISMTPMailerDoc, ISMTPMailerModel } from './types';

const schema = new Schema<ISMTPMailerDoc, ISMTPMailerModel, ISMTPMailer>({
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
    encrypt: true,
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

schema.plugin(cryptoPlugin<ISMTPMailer, ISMTPMailerDoc, ISMTPMailerModel>());
export default appendStatics(schema);
