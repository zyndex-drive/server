import { model } from 'mongoose';
import schema from './schema';
import type { IFrontendDoc } from './types';

export default model<IFrontendDoc>('Frontend', schema);
