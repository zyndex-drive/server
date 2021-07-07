import { model } from 'mongoose';
import schema from './schema';
import type { IPendingUserDoc } from './types';

export default model<IPendingUserDoc>('PendingUser', schema);
