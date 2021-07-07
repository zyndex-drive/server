import { model } from 'mongoose';
import schema from './schema';
import type { IPolicyDoc } from './types';

export default model<IPolicyDoc>('Policy', schema);
