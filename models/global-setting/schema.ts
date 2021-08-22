import { Schema } from 'mongoose';
import { createDoc, clearAll } from './statics';
import type { IGlobalSettings, IGlobalSettingsModel } from './types';

const schema = new Schema<IGlobalSettings, IGlobalSettingsModel>({
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

schema.statics.createDoc = createDoc;
schema.statics.clearAll = clearAll;

export default schema;
