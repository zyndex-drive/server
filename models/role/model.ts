import { model } from 'mongoose';
import schema from './schema';
import type { IRole, IRoleModel } from './types';

export default model<IRole, IRoleModel>('Role', schema);
