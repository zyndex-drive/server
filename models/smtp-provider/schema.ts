import { Schema } from 'mongoose';
import type { ISMTPProvider, ISMTPProviderModel } from './types';

export default new Schema<ISMTPProvider, ISMTPProviderModel>({
  _id: {
    type: String,
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
