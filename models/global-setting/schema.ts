import { Schema } from 'mongoose';
import appendStatics from './statics';
import type { IGlobalSettingsDoc, IGlobalSettingsModel } from './types';

const schema = new Schema<IGlobalSettingsDoc, IGlobalSettingsModel>({
  _id: {
    type: Schema.Types.ObjectId,
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

export default appendStatics(schema);
