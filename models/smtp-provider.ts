import { Schema, model } from 'mongoose';
import type { smtpProvider as SmtpProviderType } from '../types/models';

const smtpProviderSchema = new Schema<SmtpProviderType>({
  _id: {
    type: String,
    required: true,
    unique: true,
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

const SMTPProviders = model<SmtpProviderType>(
  'SMTPProvider',
  smtpProviderSchema,
);
export default SMTPProviders;
