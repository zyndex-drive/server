import { Schema } from 'mongoose';
import appendStatics from './statics';
import type { IRoleDoc, IRoleModel } from './types';

const schema = new Schema<IRoleDoc, IRoleModel>({
  _id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['main', 'sub'],
    required: true,
  },
  delgates_from: {
    type: Schema.Types.ObjectId || null,
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
  specific_settings: [
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
});

export default appendStatics(schema);
