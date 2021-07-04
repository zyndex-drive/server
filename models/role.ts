import { Schema, model } from 'mongoose';
import type { role as RoleType } from '../types/models';

const roleSchema = new Schema<RoleType>({
  _id: {
    type: String,
    required: true,
    unique: true,
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

const Roles = model<RoleType>('Role', roleSchema);
export default Roles;
