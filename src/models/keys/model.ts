import { model } from 'mongoose';
import schema from './schema';
import type { IKeyDoc, IKeyModel } from './types';

export default model<IKeyDoc, IKeyModel>('Keys', schema);
