import { model } from 'mongoose';
import schema from './schema';
import type { IServiceAcc, IServiceAccModel } from './types';

export default model<IServiceAcc, IServiceAccModel>('ServiceAccounts', schema);
