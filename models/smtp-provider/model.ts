import { model } from 'mongoose';
import schema from './schema';
import type { ISMTPProvider, ISMTPProviderModel } from './types';

export default model<ISMTPProvider, ISMTPProviderModel>('SMTPProvider', schema);
