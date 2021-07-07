import { Schema } from 'mongoose';
import type { IGlobalSettingsDoc } from './types';

export default new Schema<IGlobalSettingsDoc>({
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
