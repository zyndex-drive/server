import { model } from 'mongoose';
import schema from './schema';
import type { ISessionDoc, ISessionModel } from './types';

export default model<ISessionDoc, ISessionModel>('Session', schema);
