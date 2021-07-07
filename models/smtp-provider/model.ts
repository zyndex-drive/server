import { model } from 'mongoose';
import schema from './schema';
import type { ISMTPProviderDoc } from './types';

export default model<ISMTPProviderDoc>('SMTPProvider', schema);
