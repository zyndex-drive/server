import { model } from 'mongoose';
import schema from './schema';
import type { ISMTPMailer, ISMTPMailerModel } from './types';

export default model<ISMTPMailer, ISMTPMailerModel>('SMTPMailer', schema);
