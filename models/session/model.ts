import { model } from 'mongoose';
import schema from './schema';
import type { ISession, ISessionModel } from './types';

export default model<ISession, ISessionModel>('Session', schema);
