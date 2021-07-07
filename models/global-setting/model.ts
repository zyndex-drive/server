import { model } from 'mongoose';
import schema from './schema';
import type { IGlobalSettings } from './types';

export default model<IGlobalSettings>('GlobalSetting', schema);
