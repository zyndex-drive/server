import { Schema } from 'mongoose';
import appendStatics from './statics';
import type {
  IGlobalSettings,
  IGlobalSettingsDoc,
  IGlobalSettingsModel,
} from './types';

const schema = new Schema<
  IGlobalSettingsDoc,
  IGlobalSettingsModel,
  IGlobalSettings
>({
  _id: {
    type: Schema.Types.ObjectId,
  },
  code: {
    type: String,
    unique: true,
    required: true,
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
    type: Schema.Types.Mixed,
    refPath: 'reference',
    required: true,
  },
  reference: {
    type: String,
    enum: ['SMTPMailer', 'SMTPProvider', 'MailTemplates'],
  },
});

export default appendStatics(schema);
