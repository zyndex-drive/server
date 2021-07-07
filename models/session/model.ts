import { model } from 'mongoose';
import schema from './schema';
import type { ISessionDoc } from './types';

export default model<ISessionDoc>('Session', schema);
