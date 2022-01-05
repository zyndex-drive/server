import { Schema } from 'mongoose';
import appendStatics from './statics';
import { cryptoPlugin } from '@plugins/db/plugins';
import type {
  ISMTPProvider,
  ISMTPProviderDoc,
  ISMTPProviderModel,
} from './types';

const schema = new Schema<ISMTPProviderDoc, ISMTPProviderModel, ISMTPProvider>({
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
  type: {
    type: String,
    enum: ['gmail', 'others'],
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
    encrypt: true,
  },
  dkim_options: {
    domain: {
      type: String,
    },
    key_selector: {
      type: String,
    },
  },
});

schema.plugin(
  cryptoPlugin<ISMTPProvider, ISMTPProviderDoc, ISMTPProviderModel>(),
);
export default appendStatics(schema);
