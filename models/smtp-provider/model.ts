import { model } from 'mongoose';
import schema from './schema';
import type { ISMTPProviderDoc, ISMTPProviderModel } from './types';

export default model<ISMTPProviderDoc, ISMTPProviderModel>(
  'SMTPProvider',
  schema,
);
