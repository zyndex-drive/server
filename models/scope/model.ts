import { model } from 'mongoose';
import schema from './schema';
import type { IScopeDoc, IScopeModel } from './types';

export default model<IScopeDoc, IScopeModel>('Scope', schema);
