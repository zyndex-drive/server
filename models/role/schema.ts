import { Schema } from 'mongoose';
import { createDoc, clearAll } from './statics';
import type { IRole, IRoleModel } from './types';

const schema = new Schema<IRole, IRoleModel>({
  _id: {
    type: String,
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

schema.statics.createDoc = createDoc;
schema.statics.clearAll = clearAll;

export default schema;
