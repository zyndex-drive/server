import { model } from 'mongoose';
import schema from './schema';
import type { IBlacklistedUserDoc, IBlacklistedUserModel } from './types';

export default model<IBlacklistedUserDoc, IBlacklistedUserModel>(
  'BlacklistedUser',
  schema,
);
