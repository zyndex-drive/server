import { Schema } from 'mongoose';
import type { IGlobalSettings, IGlobalSettingsModel } from './types';

export default new Schema<IGlobalSettings, IGlobalSettingsModel>({
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
