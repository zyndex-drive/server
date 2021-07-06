import { Schema, model } from 'mongoose';
import type { globalSettings as GlobalSettingsType } from '../types/models';

const globalSettingsSchema = new Schema<GlobalSettingsType>({
  _id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  global_flag: {
    type: Boolean || String || Number || Schema.Types.ObjectId,
    refPath: 'reference',
    required: true,
  },
  reference: {
    type: String,
    enum: ['SMTPMailer', 'SMTPProvider'],
  },
});

const GlobalSettings = model<GlobalSettingsType>(
  'GlobalSetting',
  globalSettingsSchema,
);
export default GlobalSettings;
