import { model } from 'mongoose';
import schema from './schema';
import type { IBlacklistedUser, IBlacklistedUserModel } from './types';

export default model<IBlacklistedUser, IBlacklistedUserModel>(
  'BlacklistedUser',
  schema,
);
