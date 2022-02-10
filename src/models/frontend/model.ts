import { model } from 'mongoose';
import schema from './schema';
import type { IFrontendDoc, IFrontendModel } from './types';

export default model<IFrontendDoc, IFrontendModel>('Frontend', schema);
