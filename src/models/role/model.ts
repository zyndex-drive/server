import { model } from 'mongoose';
import schema from './schema';
import type { IRoleDoc, IRoleModel } from './types';

export default model<IRoleDoc, IRoleModel>('Role', schema);
