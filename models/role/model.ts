import { model } from 'mongoose';
import schema from './schema';
import type { IRoleDoc } from './types';

export default model<IRoleDoc>('Role', schema);
