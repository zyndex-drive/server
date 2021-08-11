import { model } from 'mongoose';
import schema from './schema';
import type { IToken, ITokenModel } from './types';

export default model<IToken, ITokenModel>('Token', schema);
