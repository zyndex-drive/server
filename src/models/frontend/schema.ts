import { Schema } from 'mongoose';
import appendStatics from './statics';
import type { IFrontend, IFrontendDoc, IFrontendModel } from './types';

const schema = new Schema<IFrontendDoc, IFrontendModel, IFrontend>({
  _id: {
    type: Schema.Types.ObjectId,
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

export default appendStatics(schema);
