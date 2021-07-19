import { Schema } from 'mongoose';
import { getFrontendUrls, createDoc } from './statics';
import type { IFrontend, IFrontendModel } from './types';

const schema = new Schema<IFrontend, IFrontendModel>({
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
      required: false,
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

schema.statics.getFrontendUrls = getFrontendUrls;
schema.statics.createDoc = createDoc;

export default schema;
