import { model } from 'mongoose';
import schema from './schema';
import type { IFrontend, IFrontendModel } from './types';

export default model<IFrontend, IFrontendModel>('Frontend', schema);
