import { model } from 'mongoose';
import schema from './schema';
import type { IUser, IUserModel } from './types';

export default model<IUser, IUserModel>('User', schema);
