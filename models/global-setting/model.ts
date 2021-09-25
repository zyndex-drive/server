import { model } from 'mongoose';
import schema from './schema';
import type { IGlobalSettingsDoc, IGlobalSettingsModel } from './types';

export default model<IGlobalSettingsDoc, IGlobalSettingsModel>(
  'GlobalSetting',
  schema,
);
