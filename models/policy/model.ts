import { model } from 'mongoose';
import schema from './schema';
import type { IPolicyDoc, IPolicyModel } from './types';

export default model<IPolicyDoc, IPolicyModel>('Policy', schema);
