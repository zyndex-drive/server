import { model } from 'mongoose';
import schema from './schema';
import type { IScopeDoc } from './types';

export default model<IScopeDoc>('Scope', schema);
