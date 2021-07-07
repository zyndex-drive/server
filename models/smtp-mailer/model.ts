import { model } from 'mongoose';
import schema from './schema';
import type { ISMTPMailerDoc } from './types';

export default model<ISMTPMailerDoc>('SMTPMailer', schema);
