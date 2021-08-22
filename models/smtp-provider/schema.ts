import { Schema } from 'mongoose';
import { createDoc, clearAll } from './statics';
import type { ISMTPProvider, ISMTPProviderModel } from './types';

const schema = new Schema<ISMTPProvider, ISMTPProviderModel>({
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

schema.statics.createDoc = createDoc;
schema.statics.clearAll = clearAll;

export default schema;
