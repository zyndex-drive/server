import { model } from 'mongoose';
import schema from './schema';
import type { IScope, IScopeModel } from './types';

export default model<IScope, IScopeModel>('Scope', schema);
