import { model } from 'mongoose';
import schema from './schema';
import type { ITokenDoc, ITokenModel } from './types';

export default model<ITokenDoc, ITokenModel>('Token', schema);
