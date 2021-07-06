import { Schema, model } from 'mongoose';
import type { smtpMailer as SmtpMailerType } from '../types/models';

const smtpMailerSchema = new Schema<SmtpMailerType>({
  _id: {
    type: String,
    required: true,
    unique: true,
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

const SMTPMailers = model<SmtpMailerType>('SMTPMailer', smtpMailerSchema);
export default SMTPMailers;
