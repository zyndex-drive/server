import { model } from 'mongoose';
import schema from './schema';
import type { IGlobalSettings, IGlobalSettingsModel } from './types';

export default model<IGlobalSettings, IGlobalSettingsModel>(
  'GlobalSetting',
  schema,
);
