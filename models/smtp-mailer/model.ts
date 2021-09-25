import { model } from 'mongoose';
import schema from './schema';
import type { ISMTPMailerDoc, ISMTPMailerModel } from './types';

export default model<ISMTPMailerDoc, ISMTPMailerModel>('SMTPMailer', schema);
