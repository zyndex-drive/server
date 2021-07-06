import { Schema, model } from 'mongoose';
import type { frontend as FrontendType } from '../types/models';

const frontendSchema = new Schema<FrontendType>({
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
    globals: [
      {
        type: Schema.Types.ObjectId,
        ref: 'GlobalSetting',
      },
    ],
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

const Frontends = model<FrontendType>('Frontend', frontendSchema);
export default Frontends;
