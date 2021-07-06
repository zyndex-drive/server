import { Schema, model } from 'mongoose';
import type { policy as PolicyType } from '../types/models';

const policySchema = new Schema<PolicyType>({
  _id: {
    type: String,
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
    type: Boolean,
    required: true,
  },
  allowed_roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
});

const Policies = model<PolicyType>('Policy', policySchema);
export default Policies;
