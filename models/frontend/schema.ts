import { Schema } from 'mongoose';
import type { IFrontendDoc } from './types';

export default new Schema<IFrontendDoc>({
  _id: {
    type: String,
  },
  domain: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  settings: {
    specifics: [
      {
        setting: {
          type: Schema.Types.ObjectId,
          ref: 'GlobalSetting',
        },
        flag: {
          type: String || Boolean || Number,
          required: true,
        },
      },
    ],
    default_mailer: {
      type: Schema.Types.ObjectId,
      ref: 'SMTPMailer',
    },
    disallowed_roles: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
    },
    allowed_policies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Policy',
      },
    ],
    disallowed_policies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Policy',
      },
    ],
  },
});
