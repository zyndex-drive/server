import { model } from 'mongoose';
import schema from './schema';
import type { IPolicy, IPolicyModel } from './types';

export default model<IPolicy, IPolicyModel>('Policy', schema);
