import { model } from 'mongoose';
import schema from './schema';
import type { IServiceAccDoc } from './types';

export default model<IServiceAccDoc>('ServiceAccounts', schema);
