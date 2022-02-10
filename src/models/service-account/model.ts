import { model } from 'mongoose';
import schema from './schema';
import type { IServiceAccDoc, IServiceAccModel } from './types';

export default model<IServiceAccDoc, IServiceAccModel>(
  'ServiceAccount',
  schema,
);
