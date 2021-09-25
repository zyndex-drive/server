import { model } from 'mongoose';
import schema from './schema';
import type { IPendingUserDoc, IPendingUserModel } from './types';

export default model<IPendingUserDoc, IPendingUserModel>('PendingUser', schema);
