import { model } from 'mongoose';
import schema from './schema';
import type { IBlacklistedUserDoc } from './types';

export default model<IBlacklistedUserDoc>('BlacklistedUser', schema);
