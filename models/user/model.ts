import { model } from 'mongoose';
import schema from './schema';
import type { IUserDoc } from './types';

export default model<IUserDoc>('User', schema);
