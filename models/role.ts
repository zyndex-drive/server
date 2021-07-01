import { Schema, model } from 'mongoose';
import { role as RoleType } from '../types/models';

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
  delgates_from: {
    type: Schema.Types.ObjectId || null,
    ref: 'Role',
  },
  max_sessions: {
    type: Number,
    required: true,
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
});

const Roles = model('Role', roleSchema);
export default Roles;
