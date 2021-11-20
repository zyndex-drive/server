import { Schema } from 'mongoose';
import appendStatics from './statics';
import type { ISMTPProviderDoc, ISMTPProviderModel } from './types';

const schema = new Schema<ISMTPProviderDoc, ISMTPProviderModel>({
  _id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  alias: {
    type: String,
    required: true,
  },
  smtp: {
    url: {
      type: String,
      required: true,
    },
    port: {
      type: Number,
      required: true,
    },
  },
  imap: {
    url: {
      type: String,
      required: true,
    },
    port: {
      type: Number,
      required: true,
    },
  },
  dkim_key: {
    type: String,
    required: true,
  },
});

export default appendStatics(schema);
