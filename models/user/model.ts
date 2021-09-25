import { model } from 'mongoose';
import schema from './schema';
import type { IUserDoc, IUserModel } from './types';

export default model<IUserDoc, IUserModel>('User', schema);
